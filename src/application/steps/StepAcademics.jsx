import BranchSelector from '../components/BranchSelector';

export default function StepAcademics({ fields, setField, errors }) {
  return (
    <div>
      <BranchSelector value={fields.branch} onChange={(b) => setField('branch', b)} error={errors.branch} />
      <p className="mt-8 mono-tag text-dim">First-year batch. All branches welcome.</p>
    </div>
  );
}
