import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Edit, Trash2, Megaphone, AlertCircle, Info, CheckCircle, Calendar, User } from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';
import { Announcement } from '../types';

const Announcements: React.FC = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Q1 All-Hands Meeting Scheduled',
      content: 'Join us for our quarterly all-hands meeting on Friday, January 26th at 2:00 PM in the main conference room. We\'ll be discussing Q4 results, Q1 goals, and exciting upcoming projects.',
      priority: 'high',
      date: '2024-01-15T10:00:00Z',
      author: 'Sarah Johnson'
    },
    {
      id: '2',
      title: 'New Employee Benefits Package',
      content: 'We\'re excited to announce improvements to our employee benefits package, including enhanced health coverage, increased PTO, and new wellness programs starting February 1st.',
      priority: 'medium',
      date: '2024-01-14T14:30:00Z',
      author: 'HR Department'
    },
    {
      id: '3',
      title: 'Office Renovation Update',
      content: 'The renovation of the east wing is progressing well. Please note that conference rooms 3A and 3B will be unavailable until February 15th. Alternative spaces have been reserved.',
      priority: 'low',
      date: '2024-01-13T09:15:00Z',
      author: 'Facilities Team'
    },
    {
      id: '4',
      title: 'Security Protocol Updates',
      content: 'Important security updates have been implemented. All employees must update their passwords and enable two-factor authentication by January 30th. IT support is available for assistance.',
      priority: 'high',
      date: '2024-01-12T16:45:00Z',
      author: 'IT Security'
    },
    {
      id: '5',
      title: 'Team Building Event - February 10th',
      content: 'Save the date! Our winter team building event will be held on February 10th at the downtown adventure center. Activities include escape rooms, laser tag, and a group dinner.',
      priority: 'medium',
      date: '2024-01-11T11:20:00Z',
      author: 'Events Committee'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const canManageAnnouncements = user?.role === 'admin' || user?.role === 'hr';

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Info className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-50 border-red-200 text-red-800',
      medium: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      low: 'bg-green-50 border-green-200 text-green-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return `Today at ${format(date, 'h:mm a')}`;
    }
    if (isYesterday(date)) {
      return `Yesterday at ${format(date, 'h:mm a')}`;
    }
    return format(date, 'MMM dd, yyyy \'at\' h:mm a');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAnnouncement) {
      setAnnouncements(prev => prev.map(ann => 
        ann.id === editingAnnouncement.id 
          ? { ...ann, ...formData }
          : ann
      ));
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString(),
        author: user?.name || 'Unknown'
      };
      setAnnouncements(prev => [newAnnouncement, ...prev]);
    }

    setFormData({ title: '', content: '', priority: 'medium' });
    setShowCreateForm(false);
    setEditingAnnouncement(null);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority
    });
    setShowCreateForm(true);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(prev => prev.filter(ann => ann.id !== id));
  };

  const handleCancel = () => {
    setFormData({ title: '', content: '', priority: 'medium' });
    setShowCreateForm(false);
    setEditingAnnouncement(null);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Megaphone className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600 mt-1">Stay updated with company news and important updates</p>
          </div>
        </div>
        {canManageAnnouncements && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            New Announcement
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter announcement title"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter announcement content"
                required
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                {editingAnnouncement ? 'Update' : 'Create'} Announcement
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

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`bg-white rounded-xl p-6 border-l-4 border shadow-sm hover:shadow-md transition-all duration-200 ${getPriorityColor(announcement.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-1">
                  {getPriorityIcon(announcement.priority)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${announcement.priority === 'high' ? 'bg-red-100 text-red-800' : announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {announcement.priority}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{announcement.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{announcement.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(announcement.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {canManageAnnouncements && (
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {announcements.length === 0 && (
          <div className="text-center py-12">
            <Megaphone className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements yet</h3>
            <p className="text-gray-500">
              {canManageAnnouncements 
                ? "Create your first announcement to keep everyone informed."
                : "Check back later for company updates and announcements."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;