import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f4f6f8' }}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
