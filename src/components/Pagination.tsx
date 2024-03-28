import useSWR from "swr";
import { Services } from "../services";
import {
  Button,
  Stack,
  IconButton,
  useMediaQuery,
  theme,
} from "@chakra-ui/react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Preload } from "./Preload";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

export const Pagination = () => {
  const params = "?offset=0&limit=20";

  const navigate = useNavigate();

  const { pageId } = useParams();

  const [isDesktop] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

  const { name, method } = Services.list(params);

  const { data: pokemonData, error, isLoading } = useSWR(name, method);

  if (isLoading) return <Preload />;

  if (error) return <div>Error: {error.message}</div>;

  const { count } = pokemonData?.data;

  const nbBtn = Math.round(count / 20);

  const navBtnOffset = isDesktop ? 3 : 1;

  const start =
    typeof pageId !== "undefined"
      ? Number(pageId) > navBtnOffset
        ? Number(pageId) - navBtnOffset
        : 0
      : 0;

  const end =
    typeof pageId !== "undefined"
      ? Number(start) + navBtnOffset * 2
      : navBtnOffset * 2;

  const isInRange = [start, end];

  const nav = (direction: boolean) => {
    window.scrollTo(0, 0);
    const uri = direction ? `/${Number(pageId) + 1}` : `/${Number(pageId) - 1}`;
    navigate(uri);
  };

  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"center"}
      sx={{
        ".active button": {
          background: "var(--chakra-colors-blue-500)",
          color: "var(--chakra-colors-white)",
        },
      }}
    >
      {Number(pageId) > 0 ? (
        <IconButton
          aria-label="prev page"
          onClick={() => nav(false)}
          icon={<FaAnglesLeft />}
        />
      ) : null}
      {Array.from(Array(nbBtn).keys()).map((_c, i) => {
        return i >= isInRange[0] && i <= isInRange[1] ? (
          <NavLink
            to={`/${i}`}
            key={i}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <Button>{i}</Button>
          </NavLink>
        ) : null;
      })}
      {Number(pageId) < nbBtn - 1 ? (
        <IconButton
          aria-label="next page"
          onClick={() => nav(true)}
          icon={<FaAnglesRight />}
        />
      ) : null}
    </Stack>
  );
};
