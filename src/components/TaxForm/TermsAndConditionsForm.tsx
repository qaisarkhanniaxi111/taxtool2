import React, { useState } from 'react';
import { FileText, CreditCard, PenTool } from 'lucide-react';
import PaymentForm from './PaymentForm';

const TermsAndConditionsForm = () => {
  const [agreements, setAgreements] = useState({
    noDirectPayments: false,
    retainerCredit: false,
    phase2Understanding: false
  });
  const [signedDocs, setSignedDocs] = useState({
    serviceAgreement: false,
    form8821: false,
    form2848: false
  });
  const [showPayment, setShowPayment] = useState(false);

  const handleCheckboxChange = (key: keyof typeof agreements) => {
    setAgreements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSignDocument = (key: keyof typeof signedDocs) => {
    setSignedDocs(prev => ({
      ...prev,
      [key]: true
    }));
  };

  const allChecked = Object.values(agreements).every(value => value);
  const allSigned = Object.values(signedDocs).every(value => value);
  const canProceed = allChecked && allSigned;

  if (showPayment) {
    return <PaymentForm onBack={() => setShowPayment(false)} />;
  }

  const DocumentCard = ({ title, description, signed, onSign }: { 
    title: string; 
    description: string; 
    signed: boolean;
    onSign: () => void;
  }) => (
    <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
      <button
        onClick={onSign}
        className={`p-2 rounded-lg transition-colors ${
          signed 
            ? 'bg-green-100 text-green-600' 
            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
        }`}
      >
        <PenTool className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">TERMS & CONDITIONS</h2>
              <p className="text-gray-600">Please Read and Sign the following</p>
            </div>
          </div>

          {/* Service Documents */}
          <div className="space-y-6">
            <div className="space-y-4">
              <DocumentCard
                title="Service Agreement"
                description="Terms and conditions of our service"
                signed={signedDocs.serviceAgreement}
                onSign={() => handleSignDocument('serviceAgreement')}
              />

              <DocumentCard
                title="Form 8821: Tax Information Authorization"
                description="Allows us to retrieve the necessary documents from the IRS"
                signed={signedDocs.form8821}
                onSign={() => handleSignDocument('form8821')}
              />

              <DocumentCard
                title="Form 2848: Power of Attorney and Declaration of Representative"
                description="Allow us to represent you"
                signed={signedDocs.form2848}
                onSign={() => handleSignDocument('form2848')}
              />
            </div>
          </div>

          {/* Agreements */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">Please check the following boxes</h3>

            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={agreements.noDirectPayments}
                  onChange={() => handleCheckboxChange('noDirectPayments')}
                  className="mt-1 w-4 h-4 text-blue-500 rounded"
                />
                <span className="text-gray-700">
                  I understand that I am not making direct payments to the IRS through this agreement.
                </span>
              </label>

              <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={agreements.retainerCredit}
                  onChange={() => handleCheckboxChange('retainerCredit')}
                  className="mt-1 w-4 h-4 text-blue-500 rounded"
                />
                <span className="text-gray-700">
                  I understand that the retainer paid will be credited toward the overall resolution cost.
                </span>
              </label>

              <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={agreements.phase2Understanding}
                  onChange={() => handleCheckboxChange('phase2Understanding')}
                  className="mt-1 w-4 h-4 text-blue-500 rounded"
                />
                <span className="text-gray-700">
                  I understand that Phase 2 will not commence until the retainer is paid in full.
                </span>
              </label>
            </div>
          </div>

          {/* Process Payment Button */}
          <button
            onClick={() => setShowPayment(true)}
            disabled={!canProceed}
            className={`w-full py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2
              ${canProceed 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
          >
            <span>Process Payment</span>
            <CreditCard className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsForm;