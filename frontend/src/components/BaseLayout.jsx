const BaseLayout = ({ children }) => {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          padding: '2rem',
          width: '100%',
          maxWidth: '400px'
        }}>
          {children}
        </div>
      </div>
    );
  };
  
  export default BaseLayout;
  