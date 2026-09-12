import { useState, useContext } from 'react';
import { Context } from '../src/context/context_api.jsx';
import { toast } from 'react-toastify';

export const useProject = () => {
  const { backend_url, state } = useContext(Context);
  const [loading, setLoading] = useState(false);

  // Like a project
  const likeProject = async (projectId) => {
    try {
      setLoading(true);
      const response = await fetch(`${backend_url}/likeproject`, {
        method: 'POST',
        headers: {
          'Authorization': state,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: projectId }),
      });

      const data = await response.json();

      if (data.project) {
        toast.success('Project liked!');
        return data.project;
      } else {
        toast.error(data.error || 'Failed to like project');
        return null;
      }
    } catch (error) {
      toast.error('Error liking project');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Unlike a project
  const unlikeProject = async (projectId) => {
    try {
      setLoading(true);
      const response = await fetch(`${backend_url}/unlikeproject`, {
        method: 'POST',
        headers: {
          'Authorization': state,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: projectId }),
      });

      const data = await response.json();

      if (data.project) {
        toast.success('Project unliked');
        return data.project;
      } else {
        toast.error(data.error || 'Failed to unlike project');
        return null;
      }
    } catch (error) {
      toast.error('Error unliking project');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Save a project
  const saveProject = async (projectId) => {
    try {
      setLoading(true);
      const response = await fetch(`${backend_url}/saveproject`, {
        method: 'POST',
        headers: {
          'Authorization': state,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: projectId }),
      });

      const data = await response.json();

      if (data.project) {
        toast.success('Project saved!');
        return data.project;
      } else {
        toast.error(data.error || 'Failed to save project');
        return null;
      }
    } catch (error) {
      toast.error('Error saving project');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Unsave a project
  const unsaveProject = async (projectId) => {
    try {
      setLoading(true);
      const response = await fetch(`${backend_url}/unsaveproject`, {
        method: 'POST',
        headers: {
          'Authorization': state,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: projectId }),
      });

      const data = await response.json();

      if (data.project) {
        toast.success('Project unsaved');
        return data.project;
      } else {
        toast.error(data.error || 'Failed to unsave project');
        return null;
      }
    } catch (error) {
      toast.error('Error unsaving project');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Add a comment
  const addComment = async (projectId, text) => {
    try {
      setLoading(true);
      const response = await fetch(`${backend_url}/addcomment`, {
        method: 'POST',
        headers: {
          'Authorization': state,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: projectId, text }),
      });

      const data = await response.json();

      if (data.project) {
        toast.success('Comment added!');
        return data.project;
      } else {
        toast.error(data.error || 'Failed to add comment');
        return null;
      }
    } catch (error) {
      toast.error('Error adding comment');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a comment
  const deleteComment = async (projectId, commentId) => {
    try {
      setLoading(true);
      const response = await fetch(`${backend_url}/deletecomment`, {
        method: 'POST',
        headers: {
          'Authorization': state,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: projectId, comment_id: commentId }),
      });

      const data = await response.json();

      if (data.project) {
        toast.success('Comment deleted');
        return data.project;
      } else {
        toast.error(data.error || 'Failed to delete comment');
        return null;
      }
    } catch (error) {
      toast.error('Error deleting comment');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get saved projects
  const getSavedProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backend_url}/savedprojects`, {
        method: 'GET',
        headers: {
          'Authorization': state,
        },
      });

      const data = await response.json();

      if (data.savedProjects) {
        return data.savedProjects;
      } else {
        toast.error(data.error || 'Failed to get saved projects');
        return [];
      }
    } catch (error) {
      toast.error('Error getting saved projects');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    likeProject,
    unlikeProject,
    saveProject,
    unsaveProject,
    addComment,
    deleteComment,
    getSavedProjects,
  };
};
