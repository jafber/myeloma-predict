export default function DisclaimerModal({ onAcknowledge }: { onAcknowledge: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-gray-900">Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed">
            This is a tool built with mock data for demonstration and testing only. Not clinically
            validated and not intended for medical decision-making.
          </p>
        </div>
        <button
          onClick={onAcknowledge}
          className="self-end bg-teal-700 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          I understand
        </button>
      </div>
    </div>
  );
}
