import { Box, Button, HStack, useColorModeValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const activeColor = useColorModeValue("blue.500", "blue.300");
  const inactiveColor = useColorModeValue("gray.600", "gray.400");

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 7; i++) {
          pages.push(i);
        }
        pages.push("...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...");
        for (let i = totalPages - 6; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1, "...");
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push("...", totalPages);
      }
    }

    return pages;
  };

  return (
    <HStack spacing={2} justify="center" mt={8} mb={4}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        leftIcon={<ChevronLeftIcon />}
        variant="outline"
        colorScheme="blue"
        size="sm"
        transition="all 0.2s"
        _hover={{
          transform: "translateX(-2px)",
          shadow: "sm",
        }}
        _disabled={{
          opacity: 0.5,
          cursor: "not-allowed",
        }}
      >
        Попередня
      </Button>

      {getPageNumbers().map((page, index) => (
        <Box key={index}>
          {page === "..." ? (
            <Box px={3} py={1} color={inactiveColor} fontWeight="medium">
              ...
            </Box>
          ) : (
            <Button
              onClick={() => onPageChange(page as number)}
              variant={currentPage === page ? "solid" : "outline"}
              colorScheme={currentPage === page ? "blue" : "gray"}
              size="sm"
              minW="40px"
              h="40px"
              p={0}
              transition="all 0.2s"
              _hover={{
                transform: "translateY(-2px)",
                shadow: "sm",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              bg={currentPage === page ? activeColor : bgColor}
              color={currentPage === page ? "white" : inactiveColor}
              borderColor={currentPage === page ? activeColor : borderColor}
            >
              {page}
            </Button>
          )}
        </Box>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        rightIcon={<ChevronRightIcon />}
        variant="outline"
        colorScheme="blue"
        size="sm"
        transition="all 0.2s"
        _hover={{
          transform: "translateX(2px)",
          shadow: "sm",
        }}
        _disabled={{
          opacity: 0.5,
          cursor: "not-allowed",
        }}
      >
        Наступна
      </Button>
    </HStack>
  );
};
