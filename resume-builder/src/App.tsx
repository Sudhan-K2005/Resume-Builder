import { ResumeProvider } from "./context/ResumeContext";
import Layout from "./components/Layout";
import StepForm from "./components/StepForm";

function App() {
  return (
    <ResumeProvider>
      <Layout>
        <StepForm />
      </Layout>
    </ResumeProvider>
  );
}

export default App;