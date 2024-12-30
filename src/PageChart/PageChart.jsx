import React from 'react';
import { Link } from 'react-router-dom';

function PageChart() {
  // Categorized projects
  const reactProjects = [
    {
      name: 'Calculator',
      link: '/Calculator',
      type: 'internal', // React Router link
    },
    {
      name: 'ToDO List',
      link: '/ToDo-List',
      type: 'internal', // React Router link
    },
  ];

  const htmlCssJsProjects = [
    {
      name: 'Microsoft Web Clone',
      link: 'https://micro-soft-web-clone.netlify.app/',
    },
    {
      name: 'Calculator',
      link: 'https://my-cal-2.netlify.app/',
    },
    {
      name: 'Tic-Tac-Toe',
      link: 'https://tic-tac-toe-webs.netlify.app/',
    },
    {
      name: 'Quiz',
      link: 'https://quiz-game-d.netlify.app/',
    },
  ];

  const renderProjects = (projects, type) => {
    return projects.map((project, index) => (
      <li
        key={index}
        className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 p-6 group"
      >
        <span className="text-xl font-bold text-gray-800 block mb-3">{project.name}</span>
        {type === 'internal' ? (
          <Link
            to={project.link}
            className="inline-block text-white bg-gradient-to-r from-blue-500 to-indigo-600 py-2 px-4 rounded-lg font-medium transition-all group-hover:scale-105"
          >
            View Project
          </Link>
        ) : (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white bg-gradient-to-r from-green-400 to-green-600 py-2 px-4 rounded-lg font-medium transition-all group-hover:scale-105"
          >
            View Project
          </a>
        )}
      </li>
    ));
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 min-h-screen flex flex-col items-center">
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-5xl font-extrabold text-white mb-6 animate-fade-in-down">
          🌟 Our Stunning Projects
        </h1>
        <p className="text-xl text-white opacity-90 mb-10 animate-fade-in-up">
          Explore and interact with our dynamic projects. Click any to see it live!
        </p>

        {/* React Projects Section */}
        <h2 className="text-3xl text-white font-bold mb-4">React.js & Tailwind CSS Projects</h2>
        <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-slow">
          {renderProjects(reactProjects, 'internal')}
        </ul>

        {/* HTML, CSS, JS Projects Section */}
        <h2 className="text-3xl text-white font-bold mt-12 mb-4">HTML, CSS & JavaScript Projects</h2>
        <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-slow">
          {renderProjects(htmlCssJsProjects, 'external')}
        </ul>
      </div>
    </div>
  );
}

export default PageChart;
