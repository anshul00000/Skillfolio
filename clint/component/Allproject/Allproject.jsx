// Allproject.jsx
import { useContext, useEffect, useState } from "react";
import { Context } from "../../src/context/context_api.jsx";
import { NavLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Follow from "../Follow/Follow";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import Comments from "../Comments/Comments";
import { useProject } from "../../hooks/useProject";
import './Allproject.css'
function Allproject() {
  const [effect_, run_effect] = useState(true);
  const [followStatus, setFollowStatus] = useState({});
  const [projects, setProjects] = useState([]);
  const { user, state, backend_url, allproject } = useContext(Context);
  const { likeProject, unlikeProject, saveProject, unsaveProject, loading } = useProject();

  // Initialize projects from context
  useEffect(() => {
    if (allproject) {
      setProjects(allproject);
    }
  }, [allproject]);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const status = {};
      if (!allproject || allproject.length === 0) {
        setFollowStatus({});
        return;
      }
      for (let project of allproject) {
        const userId = project.owner._id;
        if (user) {
          try {
            const response = await fetch(`${backend_url}/checkfollow`, {
              method: "POST",
              headers: {
                Authorization: state,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: userId }),
            });
            const data = await response.json();
            status[userId] = {
              isFollower: !!data.isFollower,
              isFollowing: !!data.isFollowing,
            };
          } catch (err) {
            // checkfollow error
          }
        }
      }
      setFollowStatus(status);
    };

    fetchFollowStatus();
  }, [allproject, user, backend_url, state, effect_]);

  const triggerRefresh = () => run_effect(!effect_);

  // Handle like/unlike
  const handleLike = async (projectId, isLiked) => {
    const updatedProject = isLiked 
      ? await unlikeProject(projectId)
      : await likeProject(projectId);
    
    if (updatedProject) {
      setProjects(prev => prev.map(p => 
        p._id === projectId ? { ...p, likes: updatedProject.likes } : p
      ));
    }
  };

  // Handle save/unsave
  const handleSave = async (projectId, isSaved) => {
    const updatedProject = isSaved
      ? await unsaveProject(projectId)
      : await saveProject(projectId);
    
    if (updatedProject) {
      setProjects(prev => prev.map(p => 
        p._id === projectId ? { ...p, savedBy: updatedProject.savedBy } : p
      ));
    }
  };

  // Handle comment update
  const handleCommentUpdate = (projectId, updatedProject) => {
    setProjects(prev => prev.map(p => 
      p._id === projectId ? { ...p, comments: updatedProject.comments } : p
    ));
  };

  // Check if user liked/saved a project
  const isLiked = (project) => {
    return user && project.likes?.some(like => like._id === user._id || like === user._id);
  };

  const isSaved = (project) => {
    return user && project.savedBy?.some(save => save._id === user._id || save === user._id);
  };

  const renderFollowControl = (ownerId) => {
    if (!user)
      return (
        <NavLink to="/login" className="btn btn-ghost small">
          Login
        </NavLink>
      );
    if (user._id === ownerId) return <span className="owner-label">You</span>;
    const s = followStatus[ownerId];
    if (!s) return <button className="btn btn-ghost small">Loading...</button>;
    if (s.isFollower && s.isFollowing)
      return <button className="btn btn-following small">Following ✔</button>;
    if (s.isFollower)
      return (
        <span onClick={triggerRefresh}>
          <Follow my_id={ownerId} back={true} un_follow={false} />
        </span>
      );
    if (s.isFollowing)
      return (
        <span onClick={triggerRefresh}>
          <Follow my_id={ownerId} back={false} un_follow={true} />
        </span>
      );
    return (
      <span onClick={triggerRefresh}>
        <Follow my_id={ownerId} />
      </span>
    );
  };

  const isLoading = !allproject || allproject.length === 0;

  return (
    <>

      <div className="all_project_container">
        {/* <h1 className="all_project_h1">Projects</h1> */}

        {isLoading  ? (
          <div className="projects_grid" role="status">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="projects_grid">
            {projects.map((project) => (
              <article
                key={project._id}
                className="project_card"
                data-aos="fade-up"
              >
                <div className="owner_bar">
                 <NavLink
                        to={`/user/${encodeURIComponent(project.owner._id)}`}
                      
                  >
                  <div className="avatar">
                    <img
                      src={
                        project.owner.photo ||
                        `${backend_url}/public/images/default.jpg`
                      }
                      alt={`${project.owner.username || "User"} avatar`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "default.jpg";
                      }}
                    />
                  </div>
                  </NavLink>
                  <div className="owner_meta">
                    <div className="owner_name">
                      {project.owner.username || "Unknown"}
                    </div>
                    <div className="owner_sub">
                      {project.owner.email || project.owner.bio || ""}
                    </div>
                  </div>
                  <div className="owner_actions">
                    {renderFollowControl(project.owner._id)}
                  </div>
                </div>

                <div className="card_body">
                  <a
                    href={project.online_link || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="preview_wrap"
                  >
                    <img
                      src={
                        project.image ||
                        `${backend_url}/public/images/default_project.jpg`
                      }
                      alt={`${project.name} preview`}
                      loading="lazy"
                    />
                  </a>

                  <div className="content">
                    <h2 className="project_title">{project.name}</h2>
                    <div className="project_desc">
                      {project.description || "No description provided."}
                    </div>
                    <div className="project_tags">
                      {project.technologys || ""}
                    </div>

                    <div className="actions_row">
                      {project.github_link ? (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-github small"
                        >
                          <GitHubIcon sx={{ fontSize: 16 }} /> GitHub
                        </a>
                      ) : (
                        <button className="btn btn-ghost small" disabled>
                          GitHub
                        </button>
                      )}

                      {project.online_link ? (
                        <a
                          href={project.online_link}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-view small"
                        >
                          <OpenInNewIcon sx={{ fontSize: 16 }} /> View
                        </a>
                      ) : (
                        <button className="btn btn-ghost small" disabled>
                          No Demo
                        </button>
                      )}

                      <NavLink
                        to={`/user/${encodeURIComponent(project.owner._id)}`}
                        className="btn btn-ghost small"
                      >
                        Profile
                      </NavLink>
                    </div>

                    {/* Like, Save, and Comment Buttons */}
                    <div className="project-interactions">
                      <button
                        className={`interaction-btn ${isLiked(project) ? 'liked' : ''}`}
                        onClick={() => handleLike(project._id, isLiked(project))}
                        disabled={!user || loading}
                        title={user ? (isLiked(project) ? 'Unlike' : 'Like') : 'Login to like'}
                      >
                        <i className={`fa-${isLiked(project) ? 'solid' : 'regular'} fa-heart`}></i>
                        <span>{project.likes?.length || 0}</span>
                      </button>

                      <button
                        className={`interaction-btn ${isSaved(project) ? 'saved' : ''}`}
                        onClick={() => handleSave(project._id, isSaved(project))}
                        disabled={!user || loading}
                        title={user ? (isSaved(project) ? 'Unsave' : 'Save') : 'Login to save'}
                      >
                        <i className={`fa-${isSaved(project) ? 'solid' : 'regular'} fa-bookmark`}></i>
                        <span>{project.savedBy?.length || 0}</span>
                      </button>

                      <Comments
                        projectId={project._id}
                        comments={project.comments || []}
                        onUpdate={(updatedProject) => handleCommentUpdate(project._id, updatedProject)}
                      />
                    </div>
                  </div>
                </div>
                <div className="project_footer">
                  <div>
                    {new Date(project.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <a
                      href={project.github_link || "#"}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "var(--muted)",
                        textDecoration: "underline",
                      }}
                    >
                      Source
                    </a>
                    <a
                      href={project.online_link || "#"}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "var(--muted)",
                        textDecoration: "underline",
                      }}
                    >
                      Open
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Allproject;
