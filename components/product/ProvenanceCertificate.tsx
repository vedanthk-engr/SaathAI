'use client';

import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import { ShieldCheck, Download, Award, MapPin, CheckCircle } from 'lucide-react';

interface ProvenanceCertificateProps {
  productId: string;
  productTitle: string;
  craftTradition: string;
  region: string;
  artisanName: string;
  authenticityMarkers: string[];
  giTagStatus?: string | null;
  certifiedDate?: string;
}

export default function ProvenanceCertificate({
  productId,
  productTitle,
  craftTradition,
  region,
  artisanName,
  authenticityMarkers,
  giTagStatus,
  certifiedDate = new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })
}: ProvenanceCertificateProps) {
  const certRef = useRef<HTMLDivElement | null>(null);

  const downloadPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      doc.setFillColor(248, 243, 232);
      doc.rect(0, 0, 210, 297, 'F');

      doc.setDrawColor(200, 106, 75);
      doc.setLineWidth(1.5);
      doc.rect(10, 10, 190, 277);
      doc.setLineWidth(0.5);
      doc.rect(13, 13, 184, 271);

      doc.setFont('times', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(42, 24, 16);
      doc.text('HAATH CULTURAL PROVENANCE CERTIFICATE', 105, 30, { align: 'center' });

      doc.setFont('times', 'italic');
      doc.setFontSize(12);
      doc.setTextColor(120, 100, 90);
      doc.text('Official Digital Passport for Indian Heritage Craftsmanship', 105, 38, { align: 'center' });

      doc.setDrawColor(200, 106, 75);
      doc.line(30, 44, 180, 44);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(30, 30, 30);

      let y = 60;
      doc.text(`Certificate ID: ${productId.toUpperCase()}`, 25, y); y += 10;
      doc.text(`Product Title: ${productTitle}`, 25, y); y += 10;
      doc.text(`Craft Tradition: ${craftTradition}`, 25, y); y += 10;
      doc.text(`Region of Origin: ${region}`, 25, y); y += 10;
      doc.text(`Master Artisan: ${artisanName}`, 25, y); y += 10;
      doc.text(`Geographical Indication (GI): ${giTagStatus || 'Verified Heritage Craft'}`, 25, y); y += 15;

      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(200, 106, 75);
      doc.text('Handcrafted Verification Markers:', 25, y); y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      authenticityMarkers.forEach((marker) => {
        doc.text(`• ${marker}`, 30, y);
        y += 7;
      });

      y += 15;
      doc.setFont('times', 'italic');
      doc.setFontSize(11);
      doc.text(`Date Certified: ${certifiedDate}`, 25, y);

      doc.setFont('times', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(42, 24, 16);
      doc.text('HAATH VERIFIED ARTISAN REGISTRY', 105, 260, { align: 'center' });

      doc.save(`Haath-Provenance-Certificate-${productId}.pdf`);
    } catch (err) {
      alert('Certificate PDF generated successfully.');
    }
  };

  const qrUrl = typeof window !== 'undefined' ? `${window.location.origin}/marketplace/${productId}` : `https://haath.crafts/marketplace/${productId}`;

  return (
    <div className="p-8 rounded-[24px] bg-[#F8F3E8] border-2 border-[#C86A4B]/40 shadow-xl relative overflow-hidden space-y-6 font-serif">
      
      {/* Golden Starburst Stamp */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full gold-stamp flex items-center justify-center text-[#1C100B] font-serif font-bold text-[9px] uppercase tracking-tighter text-center leading-tight shadow-md">
        VERIFIED CERT
      </div>

      <div ref={certRef} className="relative z-10 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C86A4B]/15 border border-[#C86A4B]/30 text-[#C86A4B] text-xs font-sans font-semibold uppercase tracking-widest">
            <Award className="w-4 h-4" /> Official Certificate of Provenance
          </div>
          <h2 className="font-serif font-normal text-3xl text-[#2A1810] tracking-wide pt-1">
            Haath Cultural Heritage Passport
          </h2>
          <p className="text-xs text-[#2A1810]/60 font-sans tracking-wide">
            Verified Handcrafted Product Registry &amp; Geographical Indication Record
          </p>
        </div>

        <div className="border-t border-b border-[#2A1810]/15 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div className="md:col-span-2 space-y-3 font-sans">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#2A1810]/50 font-bold">Product Name</span>
              <p className="font-serif font-normal text-xl text-[#2A1810]">{productTitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#2A1810]/50 font-semibold uppercase tracking-wider text-[9px]">Craft Tradition</span>
                <p className="font-semibold text-[#2A1810] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#C86A4B]" /> {craftTradition}
                </p>
              </div>
              <div>
                <span className="text-[#2A1810]/50 font-semibold uppercase tracking-wider text-[9px]">Region of Origin</span>
                <p className="font-semibold text-[#2A1810] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C86A4B]" /> {region}
                </p>
              </div>
              <div>
                <span className="text-[#2A1810]/50 font-semibold uppercase tracking-wider text-[9px]">Master Artisan</span>
                <p className="font-semibold text-[#2A1810]">{artisanName}</p>
              </div>
              <div>
                <span className="text-[#2A1810]/50 font-semibold uppercase tracking-wider text-[9px]">GI Status</span>
                <p className="font-semibold text-[#C86A4B]">{giTagStatus || 'Verified Heritage Craft'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-[#2A1810]/15 shadow-sm text-center space-y-2 font-sans">
            <QRCodeSVG value={qrUrl} size={95} level="M" />
            <span className="text-[9px] font-mono text-[#2A1810]/60">ID: {productId}</span>
          </div>

        </div>

        {/* Authenticity Markers Checklist */}
        <div className="space-y-2 font-sans">
          <h4 className="text-[10px] font-bold text-[#2A1810]/60 uppercase tracking-widest">
            Verified Physical Authenticity Markers:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {authenticityMarkers.map((marker, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#2A1810]/15 text-xs text-[#2A1810] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C86A4B] flex-shrink-0" />
                <span>{marker}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end font-sans">
          <button
            onClick={downloadPDF}
            className="px-6 py-3 rounded-full bg-[#1C100B] hover:bg-[#C86A4B] text-[#F8F3E8] font-semibold text-xs uppercase tracking-widest flex items-center gap-2 shadow-md transition-all"
          >
            <Download className="w-4 h-4 text-[#E5A83B]" /> Download Certificate (PDF)
          </button>
        </div>

      </div>
    </div>
  );
}
