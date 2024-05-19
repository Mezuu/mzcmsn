import { Outlet } from 'react-router-dom';
// import { Header } from '../components/Header';
import { Divider, Sheet, Stack } from '@mui/joy';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';

export const TRANSITION_DELAY = 2200

export function Root() {
	const [transitionDone, setTransitionDone] = useState<boolean>(false)

	useEffect(() => {
		setTimeout(() => {
			setTransitionDone(true)
		}, TRANSITION_DELAY)
	}, [])

	return (
		<Sheet sx={{
			width: `100dvw`,
			maxWidth: '100%',
			minHeight: '100dvh',
			overflowX: 'hidden',
			display: 'flex',
			justifyContent: 'center',
		}}>
			<Sheet sx={{
				width: {
					xl: '80%',
					md: '90%',
					xs: '90%'
				},
			}}>
				<Header />
				<Divider sx={{ mb: 8 }} />
				<motion.div style={{
					position: 'fixed', backgroundColor: 'var(--joy-palette-background-surface)', zIndex: 998, overflow: 'hidden'
				}} initial={{
					height: '100dvh',
					width: '100dvw',
					top: 0, left: 0,
				}} animate={{
					height: 0,
					width: 0,
					borderRadius: '100%',
					top: 'calc(100dvh/2)',
					left: 'calc(100dvw/2)'
				}} transition={{
					duration: 0.35,
					ease: 'easeOut',
					delay: 2
				}}>
					<Stack
						sx={{ height: '100%', position: 'fixed', top: 0, left: 0, width: '100dvw', overflow: 'hidden', display: transitionDone ? 'none' : 'flex' }}
						direction='row' justifyContent='center' alignItems='center'>
						<Sheet sx={{
							background: 'none',
							overflow: 'hidden'
						}}>
							<motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.3, delay: 2, ease: 'easeInOut' }}>
								{'WELCOME'.split('').map((char, index) => {
									return <motion.span key={index}
										initial={{
											opacity: 0
										}}
										animate={{
											opacity: [0, 1],
										}} transition={{
											delay: 0.1 * index,
											duration: 1,
											ease: 'easeInOut'
										}}
										style={{
											fontWeight: 'bold',
											fontSize: 72
										}} >
										{char}
									</motion.span>
								})}
							</motion.div>
						</Sheet>
					</Stack>
				</motion.div>

				<Outlet />
			</Sheet>
		</Sheet>
	);
}
