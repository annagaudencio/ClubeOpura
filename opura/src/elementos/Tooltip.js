import React from 'react';

// Tooltip component with blur effect
export default function Tooltip({ type = "dynamic", content, title, body, position, children }) {
  if (type === "fixed") {
    return <FixedTooltip title={title} body={body} position={position} />;
  } else {
    return <DynamicTooltip content={content}>{children}</DynamicTooltip>;
  }
}

// Tooltip fixo com SVGs personalizados
function FixedTooltip({ title, body, position = "bottom" }) {
  const renderSVG = () => {
    switch (position) {
      case "top":
        return (
          <svg width="91" height="74" viewBox="0 0 91 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="clipVidro">
                <path fillRule="evenodd" clipRule="evenodd" 
                      d="M56.9053 8.2363C55.7822 8.2363 54.7109 7.76418 53.9531 6.93532L48.8019 1.30098C47.216 -0.433657 44.4835 -0.433657 42.8976 1.30098L37.7463 6.93532C36.9886 7.76418 35.9172 8.2363 34.7942 8.2363H8C3.58172 8.2363 0 11.818 0 16.2363V65.8387C0 70.257 3.58172 73.8387 8 73.8387H83C87.4183 73.8387 91 70.257 91 65.8387V16.2363C91 11.818 87.4183 8.2363 83 8.2363H56.9053Z"/>
              </clipPath>
            </defs>

            <path fillRule="evenodd" clipRule="evenodd" 
              d="M56.9053 8.2363C55.7822 8.2363 54.7109 7.76418 53.9531 6.93532L48.8019 1.30098C47.216 -0.433657 44.4835 -0.433657 42.8976 1.30098L37.7463 6.93532C36.9886 7.76418 35.9172 8.2363 34.7942 8.2363H8C3.58172 8.2363 0 11.818 0 16.2363V65.8387C0 70.257 3.58172 73.8387 8 73.8387H83C87.4183 73.8387 91 70.257 91 65.8387V16.2363C91 11.818 87.4183 8.2363 83 8.2363H56.9053Z" 
              fill="white" fillOpacity="0.12"/>

            <foreignObject x="0" y="0" width="100%" height="100%" clipPath="url(#clipVidro)">
                <div className="glass-effect"></div>
            </foreignObject>
          </svg>
        );
      
      default:
        return (
          <div className='tooltip-pontos'>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {renderSVG()}
      <div className="absolute inset-0 flex items-center text-[var(--color-primaria)] justify-center text-center">
        <div className={`tooltip-${position}`}>
          <div className="tooltip-titulo">{title}</div>
          <div className="pontos">{body}</div>
        </div>
      </div>
    </div>
  );
}