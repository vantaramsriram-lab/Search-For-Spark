import InputField from '../components/InputField';

export default function StepIdentity({ fields, setField, errors }) {
  return (
    <div className="grid sm:grid-cols-2 gap-x-10 gap-y-9">
      <InputField
        id="name"
        label="STUDENT NAME"
        value={fields.name}
        onChange={(e) => setField('name', e.target.value)}
        error={errors.name}
        placeholder="Your full name"
        autoComplete="name"
      />
      <InputField
        id="scholar"
        label="SCHOLAR NUMBER"
        value={fields.scholar}
        onChange={(e) => setField('scholar', e.target.value)}
        error={errors.scholar}
        placeholder="26U020001"
        hint="As on your college records."
      />
      <InputField
        id="whatsapp"
        label="WHATSAPP NUMBER"
        value={fields.whatsapp}
        onChange={(e) => setField('whatsapp', e.target.value)}
        error={errors.whatsapp}
        placeholder="9848XXXXXX"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
      />
      <InputField
        id="email"
        label="EMAIL"
        value={fields.email}
        onChange={(e) => setField('email', e.target.value)}
        error={errors.email}
        placeholder="joe@gmail.com"
        type="email"
        autoComplete="email"
      />
    </div>
  );
}
