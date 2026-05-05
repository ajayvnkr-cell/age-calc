import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import AgeCalculator from './pages/AgeCalculator';
import MathCalculators from './pages/MathCalculators';
import ScientificCalculator from './pages/ScientificCalculator';
import FractionCalculator from './pages/FractionCalculator';
import PercentageCalculator from './pages/PercentageCalculator';
import RandomNumberGenerator from './pages/RandomNumberGenerator';
import PercentErrorCalculator from './pages/PercentErrorCalculator';
import ExponentCalculator from './pages/ExponentCalculator';
import BinaryCalculator from './pages/BinaryCalculator';
import HexCalculator from './pages/HexCalculator';
import HalfLifeCalculator from './pages/HalfLifeCalculator';
import QuadraticFormulaCalculator from './pages/QuadraticFormulaCalculator';
import LogCalculator from './pages/LogCalculator';
import RatioCalculator from './pages/RatioCalculator';
import RootCalculator from './pages/RootCalculator';
import StandardDeviationCalculator from './pages/StandardDeviationCalculator';
import NumberSequenceCalculator from './pages/NumberSequenceCalculator';
import SampleSizeCalculator from './pages/SampleSizeCalculator';
import ProbabilityCalculator from './pages/ProbabilityCalculator';
import StatisticsCalculator from './pages/StatisticsCalculator';
import MeanMedianModeRangeCalculator from './pages/MeanMedianModeRangeCalculator';
import PermutationCombinationCalculator from './pages/PermutationCombinationCalculator';
import ZScoreCalculator from './pages/ZScoreCalculator';
import ConfidenceIntervalCalculator from './pages/ConfidenceIntervalCalculator';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AgeCalculator />} />
          <Route path="math" element={<MathCalculators />} />
          <Route path="math/scientific" element={<ScientificCalculator />} />
          <Route path="math/fraction" element={<FractionCalculator />} />
          <Route path="math/percentage" element={<PercentageCalculator />} />
          <Route path="math/random" element={<RandomNumberGenerator />} />
          <Route path="math/percent-error" element={<PercentErrorCalculator />} />
          <Route path="math/exponent" element={<ExponentCalculator />} />
          <Route path="math/binary" element={<BinaryCalculator />} />
          <Route path="math/hex" element={<HexCalculator />} />
          <Route path="math/half-life" element={<HalfLifeCalculator />} />
          <Route path="math/quadratic" element={<QuadraticFormulaCalculator />} />
          <Route path="math/log" element={<LogCalculator />} />
          <Route path="math/ratio" element={<RatioCalculator />} />
          <Route path="math/root" element={<RootCalculator />} />
          <Route path="math/standard-deviation" element={<StandardDeviationCalculator />} />
          <Route path="math/number-sequence" element={<NumberSequenceCalculator />} />
          <Route path="math/sample-size" element={<SampleSizeCalculator />} />
          <Route path="math/probability" element={<ProbabilityCalculator />} />
          <Route path="math/statistics" element={<StatisticsCalculator />} />
          <Route path="math/mean-median-mode" element={<MeanMedianModeRangeCalculator />} />
          <Route path="math/permutation-combination" element={<PermutationCombinationCalculator />} />
          <Route path="math/z-score" element={<ZScoreCalculator />} />
          <Route path="math/confidence-interval" element={<ConfidenceIntervalCalculator />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
