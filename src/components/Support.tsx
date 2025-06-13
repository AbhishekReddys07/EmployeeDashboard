import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, MessageSquare, AlertCircle, CheckCircle, Clock, User, Calendar, Send } from 'lucide-react';
import { format } from 'date-fns';
import { Ticket } from '../types';

const Support: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      title: 'Unable to access project dashboard',
      description: 'I\'m getting a 403 error when trying to access the project dashboard. This started happening yesterday after the system update.',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2024-01-14T09:30:00Z',
      createdBy: 'Mike Chen'
    },
    {
      id: '2',
      title: 'Request for additional storage space',
      description: 'Our team needs additional cloud storage for the upcoming project. Current limit is insufficient for our requirements.',
      priority: 'medium',
      status: 'open',
      createdAt: '2024-01-13T14:15:00Z',
      createdBy: 'Sarah Johnson'
    },
    {
      id: '3',
      title: 'VPN connection issues',
      description: 'Having trouble connecting to the company VPN from home. Connection keeps timing out after a few minutes.',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2024-01-12T11:45:00Z',
      createdBy: 'Tom Wilson'
    }
  ]);

  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });
  const [feedbackForm, setFeedbackForm] = useState({
    category: 'general',
    feedback: '',
    anonymous: true
  });

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'open':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'resolved': 'bg-green-50 border-green-200',
      'in-progress': 'bg-blue-50 border-blue-200',
      'open': 'bg-orange-50 border-orange-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-50 border-gray-200';
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTicket: Ticket = {
      id: Date.now().toString(),
      ...ticketForm,
      status: 'open',
      createdAt: new Date().toISOString(),
      createdBy: user?.name || 'Unknown'
    };
    
    setTickets(prev => [newTicket, ...prev]);
    setTicketForm({ title: '', description: '', priority: 'medium' });
    setShowCreateTicket(false);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send feedback to a backend
    alert('Thank you for your feedback! We appreciate your input.');
    setFeedbackForm({ category: 'general', feedback: '', anonymous: true });
    setShowFeedback(false);
  };

  const myTickets = tickets.filter(ticket => ticket.createdBy === user?.name);
  const openTickets = myTickets.filter(ticket => ticket.status !== 'resolved').length;
  const resolvedTickets = myTickets.filter(ticket => ticket.status === 'resolved').length;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Support & Feedback</h1>
            <p className="text-gray-600 mt-1">Get help and share your thoughts</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFeedback(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Send className="h-4 w-4" />
            Give Feedback
          </button>
          <button
            onClick={() => setShowCreateTicket(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            Create Ticket
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{myTickets.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{openTickets}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">{resolvedTickets}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Ticket Form */}
      {showCreateTicket && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create Support Ticket</h2>
          </div>
          
          <form onSubmit={handleTicketSubmit} className="space-y-6">
            <div>
              <label htmlFor="ticketTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Issue Title
              </label>
              <input
                type="text"
                id="ticketTitle"
                value={ticketForm.title}
                onChange={(e) => setTicketForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div>
              <label htmlFor="ticketDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description
              </label>
              <textarea
                id="ticketDescription"
                value={ticketForm.description}
                onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please provide as much detail as possible to help us resolve your issue quickly"
                required
              />
            </div>

            <div>
              <label htmlFor="ticketPriority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="ticketPriority"
                value={ticketForm.priority}
                onChange={(e) => setTicketForm(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low - General inquiry</option>
                <option value="medium">Medium - Affecting productivity</option>
                <option value="high">High - Critical issue</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Create Ticket
              </button>
              <button
                type="button"
                onClick={() => setShowCreateTicket(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Feedback Form */}
      {showFeedback && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Share Your Feedback</h2>
          </div>
          
          <form onSubmit={handleFeedbackSubmit} className="space-y-6">
            <div>
              <label htmlFor="feedbackCategory" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="feedbackCategory"
                value={feedbackForm.category}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="general">General Feedback</option>
                <option value="feature-request">Feature Request</option>
                <option value="bug-report">Bug Report</option>
                <option value="improvement">Improvement Suggestion</option>
              </select>
            </div>

            <div>
              <label htmlFor="feedbackText" className="block text-sm font-medium text-gray-700 mb-2">
                Your Feedback
              </label>
              <textarea
                id="feedbackText"
                value={feedbackForm.feedback}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, feedback: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your thoughts, suggestions, or report any issues you've encountered"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={feedbackForm.anonymous}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, anonymous: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700">
                Submit anonymously
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Submit Feedback
              </button>
              <button
                type="button"
                onClick={() => setShowFeedback(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* My Tickets */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">My Support Tickets</h2>
        <div className="space-y-4">
          {myTickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-200 ${getStatusColor(ticket.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex flex-col items-center gap-2 mt-1">
                    {getPriorityIcon(ticket.priority)}
                    {getStatusIcon(ticket.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPriorityBadge(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {ticket.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{ticket.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{ticket.createdBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(ticket.createdAt), 'MMM dd, yyyy \'at\' h:mm a')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {myTickets.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets yet</h3>
              <p className="text-gray-500">Create a ticket if you need help or have any issues.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;