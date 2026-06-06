import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Constellations from './components/Constellations';
import About from './components/About.jsx'
import Art from './components/Art.jsx'
import Menu from './components/Menu.jsx'
import Contact from './components/Contact.jsx'
import SolarSystem from './components/SolarSystem.jsx'

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
	return (
		<main>
			<Navbar />
			<Hero />
			<Constellations />
			<About />
			<Art />
			<SolarSystem />
			<Menu />
			<Contact />
		</main>
	)
}

export default App
