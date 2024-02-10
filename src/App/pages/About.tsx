import { Container } from "@mui/material";
import { FC } from "react";

export const About: FC = () => {
	return (
		<Container
			maxWidth="md"
			component="main"
		>
			<section>
				<h1>About this project</h1>
			</section>
			<section>
				<h2>Motivation</h2>
				<p>
					To discuss the motivation, let me tell
					you about my personal experiences with
					Dyson Sphere Program. I played DSP a lot
					during the Covid pandemic. When I look
					back, I might have enjoyed it a little
					too much. I noticed that, after each
					long session, my fingers were sore from
					clicking the hundreds of sorters.
				</p>
				<p>
					One day, I decided to sit down, and
					thought about the possible reasons why
					my fingers were sore. It was because I
					was clicking so much. Then, I
					understood. I was playing
					"inefficiently" which led to excessively
					clicking.
				</p>
				<p>
					When I build a new array of smelts, I
					would place down roughly fifty arc
					smelters, then monitor which one did not
					receive input, and remove the excess
					from the array. It was rather primitive.
				</p>
				<p>
					Later that night, the idea of this
					calculator came to me in a dream. What
					if I can determine the optimal number of
					arc smelters beforehand, then I would
					not waste extra clicks, and potentially
					give myself carpal tunnel by the age of
					thrity.
				</p>
			</section>
			<section>
				<h2>Scopes</h2>
				<p>
					At the time, Factorio Lab was one of the
					few calulator available for DSP, and it
					was missing features I need to save my
					fingers. So I had to take initiative and
					build one myself.
				</p>
				<p>
					Consider a basic iron ingot setup. One
					line of tier three belt supplies iron
					ore, and another takes iron ingot away.
					Let's say the iron ores are
					proliferated, and the plane smelter
					bonus is set to speed bonus. In this
					scenario, it can be calculated that five
					is the optimal number of plane smelters.
					More than five, the supply could not
					keep up results in idling, and any less,
					wasteful.
				</p>
				<p>
					This is the core problem this calculator
					addresses. How do make this calculation
					for other scenarios.
				</p>
			</section>
		</Container>
	);
};
