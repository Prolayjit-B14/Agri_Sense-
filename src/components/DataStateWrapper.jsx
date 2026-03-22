import React from 'react';
import { Loader2, Radio } from 'lucide-react';

const DataStateWrapper = ({ isLoading, hasData, children }) => {
  if (isLoading) return (
    <div style={{ padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px', color: '#64748b' }}>
       <Loader2 size={32} className="animate-spin" style={{ animationDuration: '2s' }} />
       <p style={{ fontSize: '0.8rem', fontWeight: 800 }}>Initializing Neural Link...</p>
    </div>
  );
  if (!hasData) return (
    <div style={{ padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px', color: '#94a3b8' }}>
       <Radio size={32} />
       <p style={{ fontSize: '0.8rem', fontWeight: 800 }}>Waiting for Hardware Broadcast...</p>
    </div>
  );
  return children;
};

export default DataStateWrapper;

/* 
  Usage:
  <DataStateWrapper isLoading={isDataLoading} hasData={!!sensorData}>
    {content}
  </DataStateWrapper>
*/
