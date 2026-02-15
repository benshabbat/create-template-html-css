import { useState } from 'react';
import Dropdown from './Dropdown';

function DropdownExample() {
  const [selected, setSelected] = useState('');
  const [searchableSelected, setSearchableSelected] = useState('');
  const [multiSelected, setMultiSelected] = useState([]);

  const simpleOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  
  const complexOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'next', label: 'Next.js' }
  ];

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Dropdown Component Examples</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Basic Dropdown</h2>
        <Dropdown
          label="Choose a fruit"
          options={simpleOptions}
          value={selected}
          onChange={setSelected}
          placeholder="Select a fruit"
        />
        <p>Selected: {selected || 'None'}</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Searchable Dropdown</h2>
        <Dropdown
          label="Select your country"
          options={countries}
          value={searchableSelected}
          onChange={setSearchableSelected}
          placeholder="Search and select..."
          searchable
        />
        <p>Selected: {searchableSelected || 'None'}</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Multiple Selection</h2>
        <Dropdown
          label="Choose frameworks"
          options={complexOptions}
          value={multiSelected}
          onChange={setMultiSelected}
          placeholder="Select frameworks"
          multiple
          searchable
        />
        <p>Selected: {multiSelected.join(', ') || 'None'}</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Disabled Dropdown</h2>
        <Dropdown
          label="Disabled dropdown"
          options={simpleOptions}
          placeholder="Cannot select"
          disabled
        />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>With Error</h2>
        <Dropdown
          label="Required field"
          options={simpleOptions}
          placeholder="Please select"
          error="This field is required"
        />
      </section>
    </div>
  );
}

export default DropdownExample;
