import { useState, useEffect } from 'react';
import Progress from './Progress';

function ProgressExample() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Simulate upload progress
  useEffect(() => {
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Simulate download progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Progress Component Examples</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Basic Progress</h2>
        <Progress value={50} />
        <Progress value={75} variant="success" />
        <Progress value={30} variant="warning" />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Sizes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Small</p>
            <Progress value={60} size="small" variant="primary" />
          </div>
          <div>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Medium (default)</p>
            <Progress value={60} size="medium" variant="primary" />
          </div>
          <div>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Large</p>
            <Progress value={60} size="large" variant="primary" />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Colors</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Progress value={70} variant="primary" showPercentage />
          <Progress value={70} variant="secondary" showPercentage />
          <Progress value={70} variant="success" showPercentage />
          <Progress value={70} variant="warning" showPercentage />
          <Progress value={70} variant="error" showPercentage />
          <Progress value={70} variant="info" showPercentage />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>With Labels</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Progress 
            value={45} 
            variant="primary" 
            showLabel 
            label="Uploading files"
          />
          <Progress 
            value={78} 
            variant="success" 
            showPercentage 
            size="large"
          />
          <Progress 
            value={23} 
            max={50} 
            variant="info" 
            showLabel
          />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Striped Progress</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Progress value={60} variant="primary" striped />
          <Progress value={45} variant="success" striped />
          <Progress value={80} variant="warning" striped />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Animated Striped</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Progress value={65} variant="primary" striped animated showPercentage />
          <Progress value={40} variant="success" striped animated showPercentage />
          <Progress value={85} variant="error" striped animated showPercentage />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Indeterminate (Loading)</h2>
        <Progress indeterminate variant="primary" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Use when progress cannot be determined
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Live Progress Examples</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Uploading...</span>
              <span style={{ fontSize: '0.875rem', color: '#666' }}>{uploadProgress}%</span>
            </div>
            <Progress 
              value={uploadProgress} 
              variant="primary" 
              striped 
              animated 
              size="large"
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Downloading...</span>
              <span style={{ fontSize: '0.875rem', color: '#666' }}>{downloadProgress}%</span>
            </div>
            <Progress 
              value={downloadProgress} 
              variant="success" 
              striped 
              animated 
              size="large"
            />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>File Upload Simulation</h2>
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📄</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>document.pdf</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>2.4 MB</div>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '##PRIMARY_COLOR##' }}>
                {uploadProgress}%
              </div>
            </div>
            <Progress 
              value={uploadProgress} 
              variant="primary" 
              striped 
              animated
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🖼️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>image.jpg</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>5.8 MB</div>
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#10b981' }}>
                {downloadProgress}%
              </div>
            </div>
            <Progress 
              value={downloadProgress} 
              variant="success" 
              striped 
              animated
            />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Skill Levels</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>JavaScript</span>
              <span style={{ fontSize: '0.875rem', color: '#666' }}>90%</span>
            </div>
            <Progress value={90} variant="primary" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>React</span>
              <span style={{ fontSize: '0.875rem', color: '#666' }}>85%</span>
            </div>
            <Progress value={85} variant="info" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>CSS</span>
              <span style={{ fontSize: '0.875rem', color: '#666' }}>80%</span>
            </div>
            <Progress value={80} variant="secondary" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Node.js</span>
              <span style={{ fontSize: '0.875rem', color: '#666' }}>75%</span>
            </div>
            <Progress value={75} variant="success" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProgressExample;
