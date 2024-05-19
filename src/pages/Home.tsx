import { Button, Card, Chip, Divider, Input, List, ListItem, Option, Select, Sheet, Stack, Typography } from '@mui/joy';
import { Hero } from '../components/Hero';
import data from '../data/works.json';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { FaChevronLeft, FaChevronRight, FaExpand, FaSearch, FaSort } from 'react-icons/fa';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import './home.css'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { MAX_ITEM_PER_PAGE } from '../assets/utils/constants';
import { SectionHeader } from '../components/SectionHeader';
import { SectionHeaderTypo } from '../components/StyledTypos';

export function Home() {
	type TArt = {
		title: string,
		description: string,
		image: string,
		tags: string[],
		date: string
	}
	type OrderBy = 'asc' | 'des'

	const [page, setPage] = useState<number>(1)
	const [hoveredCard, setHoveredCard] = useState<number | null>(null)
	const [keyword, setKeyword] = useState<string>('')
	const [sortBy, setSortBy] = useState<OrderBy>('des')
	const [debouncedKeyword] = useDebounce(keyword, 1000)
	const { scrollY } = useScroll()
	const [maxPage, setMaxPage] = useState<number>(Math.floor(data.latestCommissions.length / MAX_ITEM_PER_PAGE) + 1)

	const handlePrevPage = () => {
		if (page <= 1) return
		setPage((prev) => prev - 1)
	}
	const handleNextPage = () => {
		if (page >= maxPage) return
		setPage((prev) => prev + 1)
	}

	const paginate = (data: TArt[], page: number, maxItemPerPage: number = MAX_ITEM_PER_PAGE) => {
		const lMaxPage = Math.floor(data.length / MAX_ITEM_PER_PAGE) + 1
		if (maxPage !== lMaxPage) {
			setMaxPage(lMaxPage)
			if (page > lMaxPage) setPage(lMaxPage)
		}

		return data.slice((page - 1) * maxItemPerPage, page === maxPage ? data.length : page * maxItemPerPage)
	}

	const search = (data: TArt[], keyword: string) => {
		const combinedDesc = data.map((item) => { return [item.description, item.tags, item.title].join(' ').toLowerCase() })
		const filtered = data.filter((_, index) => combinedDesc[index].includes(keyword.toLowerCase()))
		return filtered
	}

	const sort = (data: TArt[], by: OrderBy) => {
		if (by === 'des') return data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
		return data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
	}

	const handleArtCardHoverEnter = (e: React.MouseEvent<HTMLDivElement>) => {
		setHoveredCard(Number(e.currentTarget.getAttribute('data-cardindex')))
	}

	const handleArtCardHoverLeave = () => {
		setHoveredCard(null)
	}

	useMotionValueEvent(scrollY, "change", () => {
		const header = document.getElementById('header')
		const main = document.getElementById('main')
		if (!main || !header) return
		const sectionHeaders = ['gallery', 'tos', 'pricing']
		sectionHeaders.forEach((item) => {
			const iHeader = document.getElementById(`${item}-header`)!
			const iAnchor = document.getElementById(`${item}-anchor`)!

			if (header.getBoundingClientRect().height > iAnchor.getBoundingClientRect().top) {
				iHeader.classList.add('sticky')
				iHeader.style.top = `${header.getBoundingClientRect().height}px`
				iHeader.style.width = `${main.getBoundingClientRect().width}px`
				iAnchor.style.height = `${iHeader.getBoundingClientRect().height}px`
			} else {
				iHeader.classList.remove('sticky')
				iHeader.style.width = '100%'
				iAnchor.style.height = '0px'
				iHeader.style.top = '0px'
				return
			}
		})
	})

	function Pagination() {
		return <Stack direction='row' justifyContent='center' alignItems='center' gap={2}>
			<Button variant='outlined' color='neutral' style={{ borderRadius: '50%' }} onClick={handlePrevPage}><FaChevronLeft /></Button>
			<Typography fontSize='xl3' fontWeight='bold'>{page}</Typography>
			<Typography fontSize='xl3'>/</Typography>
			<Typography fontSize='xl3'>{maxPage}</Typography>
			<Button variant='outlined' color='neutral' style={{ borderRadius: '50%' }} onClick={handleNextPage}><FaChevronRight /></Button>
		</Stack>
	}

	return (
		<Sheet id='home'>		
			{/* Hero Section */}
			<Hero />
			{/* End Hero Section */}

			{/* Main Section */}
			<Sheet>

				<SectionHeader id='gallery'>
					<Stack direction={{ lg: 'row' }} justifyContent='space-between' alignItems='center'
						sx={{ zIndex: 4, backgroundColor: 'var(--joy-palette-background-surface)' }} >
						<Stack direction='row' justifyContent='center' alignItems='center' gap={2}>
							<SectionHeaderTypo>Featured{' '}
								<Typography fontWeight='bold' color='primary'>Works</Typography>
							</SectionHeaderTypo>
							<Pagination />
						</Stack>
						<Stack direction='row' gap={2}>
							<Input size='lg' placeholder='Search' startDecorator={<FaSearch />} onChange={(e) => setKeyword(e.target.value)} />
							<Select placeholder={<Typography sx={{ display: { xl: 'inline-block', xs: 'none' } }}>Sort By</Typography>}
								sx={{ minWidth: { xs: 0, xl: 200 } }}
								startDecorator={<FaSort />} onChange={(_, val) => setSortBy(val as OrderBy)}>
								<Option value='des'>Date Uploaded (Newer)</Option>
								<Option value='asc'>Date Uploaded (Older)</Option>
							</Select>
						</Stack>
					</Stack>
				</SectionHeader>

				<ResponsiveMasonry
					columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1200: 4 }}
				>
					<Masonry gutter='48px 32px'>
						{paginate(sort(search(data.latestCommissions, debouncedKeyword), sortBy), page).map((art, index) => {
							return (<motion.div whileHover={{ scale: 1.1 }} key={index}>
								<Card data-cardindex={index} onMouseEnter={handleArtCardHoverEnter} onMouseLeave={handleArtCardHoverLeave} sx={{
									padding: 0,
									borderRadius: 'xl',
									position: 'relative',
									scale: 0.2,
									overflow: 'hidden'
								}}>
									<Sheet sx={{
										width: '100%', height: '100%', backgroundColor: 'black', position: 'absolute', zIndex: 2,
										opacity: hoveredCard === null || hoveredCard === index ? 0 : 0.5,
										transition: 'opacity .5s'
									}}></Sheet>
									<img src={art.image as string} style={{
										borderRadius: 'xl4',
									}} />
									<a href={art.image as string} style={{
										position: 'absolute', right: 0, margin: 10, opacity: 0.7, fontSize: 'xl',
										display: hoveredCard === index ? 'block' : 'none', zIndex: 3
									}}>
										<Button color='neutral'><FaExpand /></Button>
									</a>
									<Stack sx={{ padding: 2 }} gap={2}>
										<Stack direction='row' gap={1} justifyContent='space-between'>
											<Typography level='h3' fontSize='xl2'>{art.title}</Typography>
											<Stack alignItems='end'>
												{art.tags?.includes("commission") && <Chip color='primary'>Commission</Chip>}
												{art.tags?.includes("art-trade") && <Chip color='success'>Art Trade</Chip>}
												{art.tags?.includes("oc") && <Chip color='danger'>Original Character</Chip>}
												{art.tags?.includes("fanart") && <Chip color='warning'>Fanart</Chip>}
											</Stack>
										</Stack>
										<Typography fontSize='md'>{art.date}</Typography>
										<Typography fontSize='lg'>{art.description}</Typography>
									</Stack>
								</Card>
							</motion.div>
							);
						})}
					</Masonry>
				</ResponsiveMasonry>
				<Divider sx={{ mt: 2, mb: 8 }} >
					<Pagination />
				</Divider>

				<Stack gap={2} sx={{ mb: 8 }}>
					<SectionHeader id='tos'>
						<SectionHeaderTypo>Terms of <Typography fontWeight='bold' color='primary'>Services</Typography></SectionHeaderTypo>
					</SectionHeader>
					<List marker='circle'>
						<ListItem><Typography sx={{ fontSize: 'lg' }}>Default price is for non-commercial purposes only</Typography></ListItem>
						<ListItem><Typography sx={{ fontSize: 'lg' }}>Payment is done after Client approves the sketch</Typography></ListItem>
						<ListItem><Typography sx={{ fontSize: 'lg' }}>The time it takes to complete the commission may vary, depending on the complexity, queue, and the artist's schedule</Typography></ListItem>
						<ListItem><Typography sx={{ fontSize: 'lg' }}>Revision is free</Typography></ListItem>
						<ListItem><Typography sx={{ fontSize: 'lg' }}>Default image size is A4, you may ask for custom size beforehand</Typography></ListItem>
					</List>
				</Stack>

				<Stack gap={2}>
					<SectionHeader id='pricing'>
						<SectionHeaderTypo><Typography fontWeight='bold' color='primary'>Pricings</Typography></SectionHeaderTypo>
					</SectionHeader>
					<Typography fontSize='xl2'>Character Pricings</Typography>
					<Stack direction='row' gap={4} justifyContent='center' sx={{ mb: 4 }}>
						<Card sx={{ flexGrow: 1 }}>
							<Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>Headshot</Typography>
							<Divider />
							<List>
								<ListItem sx={{ fontSize: 'xl', display: 'flex', justifyContent: 'space-between' }}>Base Price <Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>$30</Typography></ListItem>
								<ListItem sx={{ fontSize: 'xl', display: 'flex', justifyContent: 'space-between' }}>Additional Character <Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>$25</Typography></ListItem>
							</List>
						</Card>
						<Card sx={{ flexGrow: 1 }}>
							<Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>Half Body</Typography>
							<Divider />
							<List>
								<ListItem sx={{ fontSize: 'xl', display: 'flex', justifyContent: 'space-between' }}>Base Price <Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>$40</Typography></ListItem>
								<ListItem sx={{ fontSize: 'xl', display: 'flex', justifyContent: 'space-between' }}>Additional Character <Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>$35</Typography></ListItem>
							</List>
						</Card>
						<Card sx={{ flexGrow: 1 }}>
							<Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>Full Body</Typography>
							<Divider />
							<List>
								<ListItem sx={{ fontSize: 'xl', display: 'flex', justifyContent: 'space-between' }}>Base Price <Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>$50</Typography></ListItem>
								<ListItem sx={{ fontSize: 'xl', display: 'flex', justifyContent: 'space-between' }}>Additional Character <Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>$40</Typography></ListItem>
							</List>
						</Card>
					</Stack>

					<Typography fontSize='xl2'>Background Pricings</Typography>
					<Stack direction='row' gap={4} justifyContent='center'>
						<Card sx={{ flexGrow: 1 }}>
							<Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>Simple</Typography>
							<Divider />
							<List>
								<ListItem sx={{ fontSize: 'xl', display: 'flex', justifyContent: 'space-between' }}>Price <Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>$25</Typography></ListItem>
							</List>
						</Card>
						<Card sx={{ flexGrow: 1 }}>
							<Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>Moderate</Typography>
							<Divider />
							<List>
								<ListItem sx={{ fontSize: 'xl', display: 'flex', justifyContent: 'space-between' }}>Price <Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>$35</Typography></ListItem>
							</List>
						</Card>
						<Card sx={{ flexGrow: 1 }}>
							<Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>Complicated</Typography>
							<Divider />
							<List>
								<ListItem sx={{ fontSize: 'xl', display: 'flex', justifyContent: 'space-between' }}>Price <Typography sx={{ fontSize: 'xl4', fontWeight: 'bold' }}>$50</Typography></ListItem>
							</List>
						</Card>
					</Stack>
				</Stack>

				<Sheet sx={{ height: '50dvh' }}></Sheet>
			</Sheet>
		</Sheet>
	);
}
