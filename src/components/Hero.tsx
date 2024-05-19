import { Alert, Button, Sheet, Stack, Typography } from "@mui/joy";
import abstract from '../assets/abstract.jpg'
import { cubicBezier, motion } from 'framer-motion'
import { TRANSITION_DELAY } from "../pages/Root";
// import { useState } from "react";

export function Hero() {
	const gradientTextSx = {
		background: "-webkit-linear-gradient(135deg, var(--joy-palette-primary-400), var(--joy-palette-danger-400))", WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent'
	}

	function CallToAction() {
		// const forYour = ["Beloved", "Friend", "Personal Collection", "Family", "Colleague"] as const
		// const [typingText, setTypingText] = useState<(typeof forYour)[number]>('Beloved')

		return <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', damping: 10, stiffness: 400 }}>
			<Sheet sx={{
				backgroundImage: `url(${abstract})`,
				backgroundSize: 'cover',
				py: 2,
				px: 3,
				borderRadius: 'xl'
			}}>
				<Stack direction='row' justifyContent='space-between' alignItems='center'>
					<Typography fontSize={{ lg: 'xl', xs: 'sm' }}>Looking for a customized hand-drawn art? 👉 Starts from <b>$30</b></Typography>
					<Button color="danger"><Typography fontSize={{ lg: 'lg', xs: 'sm' }}>Commission Now</Typography></Button>
				</Stack>
			</Sheet>
		</motion.div>
	}

	return (<Sheet sx={{ height: '100dvh', position: 'relative', mt: 16 }}>
		<Stack py={8} gap={2}>
			<Sheet>
				<Typography sx={{ fontSize: { xl: 72, md: 64, xs: 48 }, fontWeight: 'bolder', maxWidth: 800, lineHeight: 1 }}>
					Exploring Boundless Creativity: An <Typography sx={{...gradientTextSx}}>
						Art Perfect For Your Beloved
					</Typography>
				</Typography>
			</Sheet>
			<motion.div style={{ height: '50dvh', width: '100dvw' }} animate={{ height: 0 }}
				transition={{ duration: 1.5, ease: cubicBezier(.17, .67, .09, 1), delay: (TRANSITION_DELAY - 200) / 1000 }}>
			</motion.div>
			<Typography fontSize={{ md: 'xl', xs: 'lg' }} sx={{ mb: 4 }}>
				Welcome to my commission page! I am a digital artist who
				specializes in anime and cartoon style drawings. I am
				currently open for commissions and would love to work with
				you!
			</Typography>
			<motion.div style={{ height: '50dvh', width: '100dvw' }} animate={{ height: 0 }}
				transition={{ duration: 1.5, ease: cubicBezier(.17, .67, .09, 1), delay: (TRANSITION_DELAY - 200) / 1000 }}>
			</motion.div>
			<CallToAction />

		</Stack>
	</Sheet>
	);
}
