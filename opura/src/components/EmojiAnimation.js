import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player'; // Use o pacote atualizado
import animationData from '/midia/feliz-emoji-2.json';

const EmojiAnimation = () => {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: '400px', width: '400px' }}
      />
    </div>
  );
};

export default EmojiAnimation;