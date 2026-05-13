import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import Capabilities from './sections/Capabilities'
import DeepTelemetry from './sections/DeepTelemetry'
import TerminalVelocity from './sections/TerminalVelocity'
import DataAtRest from './sections/DataAtRest'
import CTABand from './sections/CTABand'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-void text-text-primary">
      <Navigation />
      <Hero />
      <Capabilities />
      <DeepTelemetry />
      <TerminalVelocity />
      <DataAtRest />
      <CTABand />
      <Footer />
    </div>
  )
}
