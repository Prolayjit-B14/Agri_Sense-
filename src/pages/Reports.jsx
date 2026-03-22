import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, Download, Share2, 
  Calendar, CheckCircle2, Info, 
  TrendingUp, BarChart, ChevronRight,
  Printer, Mail, FileCheck, Loader2,
  Database, ShieldCheck, Activity, RefreshCw
} from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
  const { sensorData, recommendations } = useApp();
  const [genStep, setGenStep] = useState(0); // 0: Idle, 1: Reading, 2: Neural, 3: formatting, 4: Ready
  const [generating, setGenerating] = useState(false);

  const steps = [
    { label: 'Idle', detail: 'Ready for System Report Synthesis' },
    { label: 'Reading Nodes', detail: 'Synchronizing Regional Telemetry...' },
    { label: 'Neural Processing', detail: 'Synthesizing Forensic AI Insights...' },
    { label: 'Formatting Audit', detail: 'Structuring Master PDF Document...' },
    { label: 'Audit Complete', detail: 'System Report Synchronized.' }
  ];

  const handleGenerate = () => {
    setGenerating(true);
    setGenStep(1);
    
    setTimeout(() => {
      setGenStep(2);
      setTimeout(() => {
        setGenStep(3);
        setTimeout(() => {
          setGenStep(4);
          setGenerating(false);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const dateStr = new Date().toLocaleString();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(5, 150, 105);
    doc.text('AGRI SENSE MASTER SYSTEM REPORT', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`FIELD AG-SYSTEM-Z | LEAD: PROLAYJIT BISWAS`, 14, 30);
    doc.text(`TIMESTAMP: ${dateStr}`, 14, 35);
    doc.text(`UID: 882-SYS-Z-PRO-F`, 160, 30);
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 40, 196, 40);
    
    // Sensor Data Table
    const sensorRows = [
      ['Moisture', `${sensorData?.soil?.moisture || 0}%`, 'Optimal'],
      ['Nitrogen (N)', `${sensorData?.soil?.npk?.n || 0} ppm`, 'Balanced'],
      ['Thermal Stress', `${sensorData?.soil?.temp || 0} °C`, 'Normal'],
      ['Storage Gas', `${sensorData?.storage?.mq135 || 0} ppm`, 'Safe']
    ];
    
    doc.autoTable({
      startY: 50,
      head: [['Metric', 'Valuation', 'System Status']],
      body: sensorRows,
      theme: 'grid',
      headStyles: { fillStyle: [5, 150, 105] }
    });
    
    // AI Recommendations
    doc.setFontSize(14);
    doc.setTextColor(5, 150, 105);
    doc.text('NEURAL ADVISORY SYNOPSIS', 14, doc.autoTable.previous.finalY + 15);
    
    const recs = recommendations.length > 0 
      ? recommendations.map(r => [r.title, r.message])
      : [['No Threats Detected', 'All biospheric nodes report stable operational parameters.']];
      
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 20,
      head: [['Advisory Title', 'Synthesis / Action Plan']],
      body: recs,
      theme: 'striped',
      headStyles: { fillStyle: [31, 41, 55] }
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('AUTHORIZED MASTER DOCUMENT - AG-FORENSICS-GLOBAL', 14, 285);
    
    doc.save(`Agri_Sense_Audit_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="page-container" style={{ padding: '0 1.25rem' }}>
      <div style={{ height: '20px' }}></div>
      
      {/* 🚀 GENERATION HUD */}
      <div className="premium-card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2.5rem', background: 'var(--bg-card)', position: 'relative' }}>
         {genStep === 0 || genStep === 4 ? (
            <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'var(--primary-ultra)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
               <FileCheck size={32} color="var(--primary)" />
            </div>
         ) : (
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px solid var(--primary-ultra)', borderTopColor: 'var(--primary)', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }}></div>
         )}

         <h4 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '8px' }}>
            {steps[genStep].label}
         </h4>
         <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '25px' }}>
            {steps[genStep].detail}
         </p>

         {genStep === 0 && (
            <button onClick={handleGenerate} className="btn-primary" style={{ width: '100%', height: '56px', borderRadius: '16px', fontWeight: 900 }}>
               START FORENSIC ASSEMBLY
            </button>
         )}

         {genStep > 0 && genStep < 4 && (
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-main)', borderRadius: '4px', overflow: 'hidden' }}>
               <div style={{ width: `${(genStep / 4) * 100}%`, height: '100%', background: 'var(--primary)', transition: '1s' }}></div>
            </div>
         )}

         {genStep === 4 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
               <button onClick={handleDownload} className="btn-primary" style={{ height: '52px', borderRadius: '14px', fontSize: '0.8rem' }}><Download size={18} /> DOWNLOAD</button>
               <button onClick={() => setGenStep(0)} className="btn-actuator off" style={{ height: '52px', color: 'var(--text-muted)' }}><RefreshCw size={18} /> RE-SYNC</button>
            </div>
         )}
      </div>

      {/* 📄 PREVIEW AREA */}
      <h3 className="section-title"><FileText size={18} /> Reports Preview</h3>
      <div className="premium-card" style={{ 
        minHeight: '450px', marginBottom: '3rem', position: 'relative', overflow: 'hidden', padding: '0',
        background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', color: '#1e293b'
      }}>
         <div style={{ padding: '30px', filter: genStep === 4 ? 'none' : 'blur(4px)', opacity: genStep === 4 ? 1 : 0.4, transition: '0.8s' }}>
            <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '20px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between' }}>
               <div>
                  <h2 style={{ fontSize: '1rem', fontWeight: 900 }}>AGRI SENSE MASTER REPORT</h2>
                  <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#64748b' }}>LEAD: PROLAYJIT BISWAS • FIELD-A</p>
               </div>
               <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 900 }}>TIMESTAMP: {new Date().toLocaleDateString()}</p>
                  <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#64748b' }}>UID: 882-SYS-Z</p>
               </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
               <h5 style={{ fontSize: '0.7rem', fontWeight: 900, marginBottom: '12px', color: 'var(--primary)' }}>TELEMETRY SYNTHESIS</h5>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                     <p style={{ fontSize: '0.5rem', fontWeight: 900, color: '#94a3b8' }}>AVG MOISTURE</p>
                     <p style={{ fontSize: '1.1rem', fontWeight: 900 }}>{sensorData?.soil?.moisture || 45}%</p>
                  </div>
                  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                     <p style={{ fontSize: '0.5rem', fontWeight: 900, color: '#94a3b8' }}>HEALTH INDEX</p>
                     <p style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)' }}>{sensorData?.soil?.healthIndex || 85}/100</p>
                  </div>
               </div>
            </div>

            <div>
               <h5 style={{ fontSize: '0.7rem', fontWeight: 900, marginBottom: '10px', color: 'var(--primary)' }}>NEURAL SUMMARY</h5>
               <p style={{ fontSize: '0.75rem', lineHeight: 1.6, fontWeight: 700, color: '#475569' }}>
                  All nodes report stable operational status. Soil moisture is within the optimal growth band. 
                  {recommendations.length > 0 && ` Critical Action: ${recommendations[0].message}`}
               </p>
            </div>

            <div style={{ marginTop: '40px', borderTop: '1px solid #f1f5f9', paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
               <div style={{ width: '40px', height: '40px', background: '#1e293b', borderRadius: '4px' }}></div>
               <p style={{ fontSize: '0.55rem', fontWeight: 900, color: '#94a3b8' }}>AUTHORIZED MASTER DOCUMENT</p>
            </div>
         </div>

         {genStep < 4 && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(1px)' }}>
               <div style={{ background: 'white', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Loader2 size={18} color="var(--primary)" className="animate-spin" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>{genStep === 0 ? 'WAITING FOR SYNC' : 'SYNTHESIZING...'}</span>
               </div>
            </div>
         )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
      <div style={{ height: '40px' }}></div>
    </div>
  );
};

export default Reports;
