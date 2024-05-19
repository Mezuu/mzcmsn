import { Typography, styled } from "@mui/joy";

export const SectionHeaderTypo = styled(Typography)(({theme}) => ({
    fontSize: 64,

    [theme.breakpoints.down('xl')]: {fontSize: 64},
    [theme.breakpoints.down('lg')]: {fontSize: 48},
    [theme.breakpoints.down('md')]: {fontSize: 28},
}))