import React from 'react';
import FeedContainer from './components/FeedContainer';
import AgeGate from './components/AgeGate';
import { useSettingsStore } from './store/settingsStore';

const App: React.FC = () => {
  const { ageVerified } = useSettingsStore();

  if (!ageVerified) {
    return <AgeGate />;
  }

  return <FeedContainer />;
};

export default App;
