import React from 'react';
import Form from './Form';

/**
 * Example usage of Form component
 */
const FormExample = () => {
  const contactFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'John Doe',
      minLength: 2
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'john@example.com',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: 'Please enter a valid email address'
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'select',
      required: true,
      options: [
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Technical Support' },
        { value: 'feedback', label: 'Feedback' }
      ]
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
      placeholder: 'Type your message here...',
      rows: 6,
      minLength: 10
    }
  ];

  const handleSubmit = (data) => {
    console.log('Form submitted with data:', data);
    alert('Form submitted successfully! Check console for details.');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <Form
        title="Contact Us"
        fields={contactFields}
        onSubmit={handleSubmit}
        submitButtonText="Send Message"
      />
    </div>
  );
};

export default FormExample;
