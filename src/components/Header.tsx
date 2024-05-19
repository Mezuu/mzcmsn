import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { Button, Link, List, ListDivider, ListItem, Sheet, Stack, Typography, styled } from '@mui/joy';
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IoMdMenu } from "react-icons/io";
import { GrPaint } from "react-icons/gr";

export function Header() {
	function HeaderLink({ icon, label = '', link, href = '' }: { icon?: React.ReactNode, label?: string, link: string, href?: string }) {
		function handleScroll(href: string){
			const element = document.getElementById(href)
			element?.scrollIntoView()
		}
		return <Link component={RouterLink} to={link}>
			<Button variant='plain' onClick={()=>{handleScroll(href)}}>
				<Typography color='neutral' sx={{ fontSize: 'xl' }} startDecorator={icon}>{label}</Typography>
			</Button>
		</Link>
	}
	const CustomListItem = styled(ListItem)(() => ({
		padding: 0
	}))

	return (
		<Sheet id='header' sx={{
			width: '100%',
			position: 'fixed',
			top: 0,
			py: 3,
			left: 0,
			zIndex: 10,
			opacity: 1,
		}}>
			<Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ px: { xs: 4, xl: 12 } }}>
				<Sheet>
					<Typography component='h2' level='h2' sx={{ display: { lg: 'inline-block', xs: 'none' } }}>Mezuu's Commission</Typography>
					<Sheet sx={{ display: { lg: 'none', xs: 'inline-block' } }}>
						<GrPaint />

					</Sheet>
				</Sheet>
				<Sheet>
					<Sheet sx={{
						display: {
							lg: 'inline-block',
							xs: 'none'
						}
					}}>
						<List orientation='horizontal' role='menubar'>
							<CustomListItem>
								<motion.div whileHover={{ scale: 1.1 }}>
									<HeaderLink label='Home' link='/' href='home' />
								</motion.div>
							</CustomListItem>
							<CustomListItem>
								<motion.div whileHover={{ scale: 1.1 }}>
									<HeaderLink label='Gallery' link='/' href='gallery'/>
								</motion.div>
							</CustomListItem>
							<CustomListItem>
								<motion.div whileHover={{ scale: 1.1 }}>
									<HeaderLink label='Terms' link='/' href='tos'/>
								</motion.div>
							</CustomListItem>
							<CustomListItem>
								<motion.div whileHover={{ scale: 1.1 }}>
									<HeaderLink label='Pricings' link='/' href='pricing'/>
								</motion.div>
							</CustomListItem>
							<ListDivider orientation='vertical' sx={{ mx: 2 }} />
							<CustomListItem>
								<motion.div whileHover={{ scale: 1.1 }}>
									<HeaderLink icon={<FaDiscord />} link='https://discord.com/channels/@me/343318072045731840' />
								</motion.div>
							</CustomListItem>
							<CustomListItem>
								<motion.div whileHover={{ scale: 1.1 }}>
									<HeaderLink icon={<FaTwitter />} link='https://twitter.com/mezuu918' />
								</motion.div>
							</CustomListItem>
						</List>
					</Sheet>

					<Button sx={{
						display: {
							lg: 'none',
							xs: 'inline-block'
						}
					}} variant='outlined' color='primary'><IoMdMenu /></Button>
				</Sheet>
			</Stack>
		</Sheet>
	);
}
