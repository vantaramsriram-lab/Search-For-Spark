import InputField from '../components/InputField';
import TextareaField from '../components/TextareaField';

export default function StepExperience({ fields, setField, errors }) {
  return (
    <div className="space-y-10">
      <InputField
        id="link"
        label="PRIOR WORK LINK (IF ANY)"
        value={fields.link}
        onChange={(e) => setField('link', e.target.value)}
        error={errors.link}
        placeholder="https://github.com/you"
        type="url"
        hint="GitHub / portfolio / LinkedIn / Drive / Behance — anything you’ve made. Optional."
      />
      <TextareaField
        id="interest"
        label="WHAT MAKES YOU INTERESTED IN PARTICULAR DOMAIN?"
        value={fields.interest}
        onChange={(e) => setField('interest', e.target.value)}
        error={errors.interest}
        placeholder="Tell us what makes you want to build in this domain..."
      />
      <p className="mono-tag text-dim">Write it like a human. We care about how you think.</p>
    </div>
  );
}
