import DomainSelector from '../components/DomainSelector';

export default function StepDomains({ errors }) {
  return (
    <div>
      <DomainSelector error={errors.domains} />
      <p className="mt-6 mono-tag text-dim">Choose your battlefield. Pick up to two.</p>
    </div>
  );
}
