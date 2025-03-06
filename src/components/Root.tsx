import { Box, Flex } from '@chakra-ui/react'
import { Link, Outlet } from '@tanstack/react-router'

export const Root = () => {
	return (
		<Box minH='100vh'>
			<Flex
				as='nav'
				align='center'
				justify='space-between'
				wrap='wrap'
				padding='1rem'
				bg='blue.500'
				color='white'>
				<Flex align='center' mr={5}>
					<Link
						to='/'
						style={{
							fontSize: '1.5rem',
							fontWeight: 'bold',
							color: 'white',
							textDecoration: 'none',
						}}>
						Рецепти
					</Link>
				</Flex>
				<Flex>
					<Link
						to='/'
						style={{
							marginRight: '1rem',
							color: 'white',
							textDecoration: 'none',
						}}>
						Всі рецепти
					</Link>
					<Link
						to='/selected'
						style={{
							color: 'white',
							textDecoration: 'none',
						}}>
						Вибрані рецепти
					</Link>
				</Flex>
			</Flex>

			<Outlet />
		</Box>
	)
}
