import React from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import WelcomeContent from './content/WelcomeContent';
import IntroContent from './content/IntroContent';
import AcademyContent from './content/AcademyContent';
import EventsContent from './content/EventsContent';
import AvatarsContent from './content/AvatarsContent';
import RankContent from './content/RankContent';

const ContentRenderer = () => {
  const { currentContent, avatarOptions, setAvatarOptions } = useDashboard();

  // Función para renderizar el contenido según la sección seleccionada
  const renderContent = () => {
    switch (currentContent) {
      case 'welcome':
        return <WelcomeContent />;
      case 'intro':
        return <IntroContent />;
      case 'academy':
        return <AcademyContent />;
      case 'events':
        return <EventsContent />;
      case 'avatars':
        return <AvatarsContent 
          avatarOptions={avatarOptions} 
          setAvatarOptions={setAvatarOptions} 
        />;
      case 'rank':
        return <RankContent />;
      default:
        return <WelcomeContent />;
    }
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
};

export default ContentRenderer;