import React, { useState } from 'react';
import { FeatureType } from '../../types/types';

const FeatureCard = ({
  feature,
  isActive,
  onClick,
}: {
  feature: FeatureType;
  isActive: boolean;
  onClick: () => void;
}) => {
  return <div>FeatureCard</div>;
};

export default FeatureCard;
