import { Box, Button, HStack } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	const getPageNumbers = () => {
		const pages = []
		const maxVisiblePages = 7

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i)
			}
		} else {
			if (currentPage <= 4) {
				for (let i = 1; i <= 7; i++) {
					pages.push(i)
				}
				pages.push('...', totalPages)
			} else if (currentPage >= totalPages - 3) {
				pages.push(1, '...')
				for (let i = totalPages - 6; i <= totalPages; i++) {
					pages.push(i)
				}
			} else {
				pages.push(1, '...')
				for (let i = currentPage - 2; i <= currentPage + 2; i++) {
					pages.push(i)
				}
				pages.push('...', totalPages)
			}
		}

		return pages
	}

	return (
		<HStack spacing={2} justify='center' mt={4}>
			<Button
				onClick={() => onPageChange(currentPage - 1)}
				isDisabled={currentPage === 1}
				leftIcon={<ChevronLeftIcon />}>
				Попередня
			</Button>

			{getPageNumbers().map((page, index) => (
				<Box key={index}>
					{page === '...' ? (
						<Box px={2}>...</Box>
					) : (
						<Button
							onClick={() => onPageChange(page as number)}
							variant={currentPage === page ? 'solid' : 'outline'}
							colorScheme={
								currentPage === page ? 'blue' : 'gray'
							}>
							{page}
						</Button>
					)}
				</Box>
			))}

			<Button
				onClick={() => onPageChange(currentPage + 1)}
				isDisabled={currentPage === totalPages}
				rightIcon={<ChevronRightIcon />}>
				Наступна
			</Button>
		</HStack>
	)
}
