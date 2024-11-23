import React, { FC } from 'react';
import styles from './DeviceDiagram.module.css';

interface DeviceDiagramProps {}

const DeviceDiagram: FC<DeviceDiagramProps> = () => (
  <div className={styles.DeviceDiagram}>
    DeviceDiagram Component
  </div>
);

export default DeviceDiagram;
