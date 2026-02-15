
import Card from './Card';

/**
 * Example usage of Card component
 */
const CardExample = () => {
  const handleCardClick = () => {
    console.log('Card clicked!');
  };

  return (
    <div style={{ padding: '40px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <Card
        title="Beautiful Mountain"
        description="Explore the breathtaking views of mountain landscapes and discover the beauty of nature."
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
        imageAlt="Mountain landscape"
        footer={
          <button style={{ padding: '8px 16px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '6px' }}>
            Learn More
          </button>
        }
        onClick={handleCardClick}
      />

      <Card
        title="Ocean Sunset"
        description="Watch the sun set over the endless horizon and feel the peaceful ocean breeze."
        image="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=200&fit=crop"
        imageAlt="Ocean sunset"
        footer={
          <button style={{ padding: '8px 16px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '6px' }}>
            Learn More
          </button>
        }
        onClick={handleCardClick}
      />

      <Card
        title="Card Without Image"
        description="This card demonstrates how the component looks without an image. It still maintains the same elegant design."
        footer={<span style={{ color: '#718096' }}>No image variant</span>}
      />
    </div>
  );
};

export default CardExample;
