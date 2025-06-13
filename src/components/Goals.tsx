import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Edit, Trash2, Target, Calendar, User, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { Goal } from '../types';

const Goals: React.FC = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Q1 Revenue Target',
      description: 'Achieve $300K in revenue for the first quarter of 2024',
      progress: 78,
      deadline: '2024-03-31',
      assignedTo: 'Sales Team',
      status: 'in-progress'
    },
    {
      id: '2',
      title: 'Product Launch - Version 2.0',
      description: 'Complete development and launch of our product version 2.0 with new features',
      progress: 92,
      deadline: '2024-02-15',
      assignedTo: 'Engineering Team',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Team Expansion',
      description: 'Hire 15 new team members across different departments',
      progress: 60,
      deadline: '2024-04-30',
      assignedTo: 'HR Department',
      status: 'in-progress'
    },
    {
      id: '4',
      title: 'Customer Satisfaction Improvement',
      description: 'Increase customer satisfaction score to 95% through improved support',
      progress: 100,
      deadline: '2024-01-15',
      assignedTo: 'Customer Success',
      status: 'completed'
    },
    {
      id: '5',
      title: 'Security Compliance Audit',
      description: 'Complete SOC 2 Type II compliance audit and certification',
      progress: 45,
      deadline: '2024-02-28',
      assignedTo: 'IT Security',
      status: 'in-progress'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    assignedTo: '',
    progress: 0
  });

  const canManageGoals = user?.role === 'admin' || user?.role === 'hr';

  const getStatusIcon = (status: string, progress: number) => {
    if (status === 'completed' || progress === 100) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    if (status === 'in-progress') {
      return <Clock className="h-5 w-5 text-blue-500" />;
    }
    return <AlertTriangle className="h-5 w-5 text-gray-400" />;
  };

  const getStatusColor = (status: string, deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const warningDate = addDays(deadlineDate, -7);

    if (status === 'completed') {
      return 'bg-green-50 border-green-200';
    }
    if (isAfter(now, deadlineDate)) {
      return 'bg-red-50 border-red-200';
    }
    if (isAfter(now, warningDate)) {
      return 'bg-yellow-50 border-yellow-200';
    }
    return 'bg-blue-50 border-blue-200';
  };

  const getDeadlineStatus = (deadline: string, status: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const warningDate = addDays(deadlineDate, -7);

    if (status === 'completed') {
      return { text: 'Completed', color: 'text-green-600' };
    }
    if (isAfter(now, deadlineDate)) {
      return { text: 'Overdue', color: 'text-red-600' };
    }
    if (isAfter(now, warningDate)) {
      return { text: 'Due Soon', color: 'text-yellow-600' };
    }
    return { text: 'On Track', color: 'text-blue-600' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingGoal) {
      setGoals(prev => prev.map(goal => 
        goal.id === editingGoal.id 
          ? { ...goal, ...formData, status: formData.progress === 100 ? 'completed' : 'in-progress' }
          : goal
      ));
    } else {
      const newGoal: Goal = {
        id: Date.now().toString(),
        ...formData,
        status: formData.progress === 100 ? 'completed' : 'in-progress'
      };
      setGoals(prev => [newGoal, ...prev]);
    }

    setFormData({ title: '', description: '', deadline: '', assignedTo: '', progress: 0 });
    setShowCreateForm(false);
    setEditingGoal(null);
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description,
      deadline: goal.deadline,
      assignedTo: goal.assignedTo,
      progress: goal.progress
    });
    setShowCreateForm(true);
  };

  const handleDelete = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', deadline: '', assignedTo: '', progress: 0 });
    setShowCreateForm(false);
    setEditingGoal(null);
  };

  const updateProgress = (id: string, newProgress: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id 
        ? { ...goal, progress: newProgress, status: newProgress === 100 ? 'completed' : 'in-progress' }
        : goal
    ));
  };

  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const totalGoals = goals.length;
  const overallProgress = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Goals & Targets</h1>
            <p className="text-gray-600 mt-1">Track progress towards company objectives</p>
          </div>
        </div>
        {canManageGoals && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            New Goal
          </button>
        )}
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Overall Progress</h2>
          <span className="text-2xl font-bold text-blue-600">{overallProgress}%</span>
        </div>
        <div className="mb-4">
          <div className="bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{totalGoals}</div>
            <div className="text-sm text-gray-600">Total Goals</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{completedGoals}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{totalGoals - completedGoals}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
        </div>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingGoal ? 'Edit Goal' : 'Create New Goal'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Goal Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter goal title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter goal description"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned To
                </label>
                <input
                  type="text"
                  id="assignedTo"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Team or person responsible"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-2">
                Progress ({formData.progress}%)
              </label>
              <input
                type="range"
                id="progress"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {editingGoal ? 'Update' : 'Create'} Goal
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const deadlineStatus = getDeadlineStatus(goal.deadline, goal.status);
          
          return (
            <div
              key={goal.id}
              className={`bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-200 ${getStatusColor(goal.status, goal.deadline)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(goal.status, goal.progress)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${deadlineStatus.color} bg-opacity-10`}>
                        {deadlineStatus.text}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{goal.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{goal.assignedTo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Due {format(new Date(goal.deadline), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {canManageGoals && (
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-900">{goal.progress}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      goal.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                {canManageGoals && goal.status !== 'completed' && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => updateProgress(goal.id, Math.min(goal.progress + 10, 100))}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200"
                    >
                      +10%
                    </button>
                    <button
                      onClick={() => updateProgress(goal.id, Math.min(goal.progress + 25, 100))}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200"
                    >
                      +25%
                    </button>
                    {goal.progress < 100 && (
                      <button
                        onClick={() => updateProgress(goal.id, 100)}
                        className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-200"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {goals.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No goals set yet</h3>
            <p className="text-gray-500">
              {canManageGoals 
                ? "Create your first goal to start tracking progress towards company objectives."
                : "Check back later for company goals and targets."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;