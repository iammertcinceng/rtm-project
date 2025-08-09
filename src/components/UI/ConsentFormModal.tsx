import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ConsentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const ConsentFormModal: React.FC<ConsentFormModalProps> = ({ isOpen, onClose, onAccept }) => {
  const [hasRead, setHasRead] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleAccept = () => {
    if (hasRead) {
      onAccept();
      onClose();
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative z-[10000]">
                 {/* Header */}
         <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Onam Formu</h2>
                <p className="text-blue-100 text-sm">Lütfen aşağıdaki metni dikkatlice okuyunuz</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <span className="text-white text-lg">×</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="prose prose-sm max-w-none">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="text-gray-800 leading-relaxed mb-4">
                <strong>Sayın hasta/ vekil/ kanuni temsilcisi;</strong>
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Doktorum tarafından tıp literatüründe yer alan Fitoterapi (bitkisel tedavi), Meridian Enerji Taraması, Akupunktur, Ozon tedavisi, Hirudoterapi (sülük tedavisi), Elektroakupunktur, LLLT Lazer, Manyetik Alan Tedavileri ile ilgili uygulamalardan istifade edebilmem gerektiği önerildi. Yukarıda belirtilen söz konusu uygulamaların genel özellikleri, etki alanları, kim tarafından nerede/ ne şekilde / nasıl yapılacağı / tahmini süresi, beklenen yararları, başarı şansı, karşılaşılabilecek tüm riskler, olası komplikasyonlar ve diğer sorunlar, önerilen uygulamanın reddedilmesi durumunda ortaya çıkabilecek riskler, gerekli olduğu takdirde tıbbi yardıma nasıl ulaşabileceğim ve nasıl iletişim kurabileceğim hususlarında anlayabileceğim şekilde açıkça bilgilendirildim. Anlayamadığım hususları sorarak aydınlatıldım.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Yukarıda belirtilen uygulamalarla ilgili olarak tarafıma her uygulamanın mahiyeti anlatılmış ve bu uygulamalarının hepsinin destek amaçlı olarak yapıldığı tarafıma açıklanmıştır. Bu konuda detaylı bir şekilde aydınlatıldım.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Yapılacak uygulamalardan destek amaçlı muhtemel fayda görebileceğimi ancak bana teminat ve garanti verilmediği anlatıldı. Bu konuda detaylı aydınlatıldım.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Bana uygulanacak işlem için gerektiğinde; vücut dışı ve içi fotoğraf çekilmesine, diğer görüntüleme işlemlerinin yapılmasına ve gizliliği sağlanarak arşivlenmesine izin veriyorum.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Söz konusu işlemin ortalama maliyeti hakkında bilgilendirildim. Bu işlemlerin planlanan işlemlere ek olarak tıbbi girişim / işlem yapılması gereken durumlarda bu maliyetin değişebileceğini biliyorum.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Yukarıda belirtilen destek amaçlı yapılacak olan girişim, işlem ya da uygulamaların yapılması için özgür irademle ve gönüllü olarak onay ve yetki veriyorum.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Tarafıma yapılan uygulamaların standart tedavilerin yerine geçmeyeceği, kronik hastalıklar için (tansiyon, şeker vb.) kullanılan ilaçların doğrudan kesilemeyeceği, bu durumda gerekli değişikliklerin takibinin yapıldığı kurumlar ve hekimlerce yapılmaya devam edilmesi gerektiği hususu tarafıma anlatıldı. Anladım, biliyorum.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Uygulanan tedaviler doğrudan kanser tedavisi değil tedaviye destek niteliğinde olduğu, bu nedenle cerrahi operasyon, kemoterapi, radyoterapi ve ilaç tedavilerinin yerine tercih edilemeyeceği, bu tedavilerle birlikte veya bitiminde tedaviye destek niteliğinde olacağı, kliniğin hastalıkla alakalı almış olunan veya planlanan herhangi bir cerrahi müdahale, kemoterapi veya radyoterapi protokollerine müdahalede bulunmayacağı, sonlandırılması veya devam ettirilmesi konusunda karar veremeyeceğini ve bu karar sadece hasta ve yakınlarına ait olduğu tarafıma anlatıldı. Anladım, biliyorum.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
               <div className="relative">
                 <input
                   type="checkbox"
                   id="hasRead"
                   checked={hasRead}
                   onChange={(e) => setHasRead(e.target.checked)}
                   className="w-6 h-6 appearance-none focus:ring-cyan-500 focus:ring-2 rounded-lg border-2 border-gray-300 checked:border-cyan-600 checked:bg-cyan-600 transition-all duration-200 cursor-pointer"
                   style={{
                     accentColor: '#0891b2', // cyan-600
                     backgroundColor: hasRead ? '#0891b2' : 'transparent',
                     borderColor: hasRead ? '#0891b2' : '#d1d5db'
                   }}
                 />
                 {hasRead && (
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translateY(-1px)' }}>
                     <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                   </div>
                 )}
               </div>
               <label htmlFor="hasRead" className="text-gray-700 font-medium cursor-pointer select-none">
                 Onam formunu okudum ve anladım
               </label>
             </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
                             <button
                 onClick={handleAccept}
                 disabled={!hasRead}
                 className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
               >
                 Kabul Ediyorum
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ConsentFormModal; 