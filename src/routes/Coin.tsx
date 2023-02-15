import { useEffect, useState } from "react";
import { Switch, Route, Link, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoin, fetchInfo, fetchTickers } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Back = styled.button`
  margin-right: 20px;
`;

const Overview = styled.div`
  background-color: tomato;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding: 0 20px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.div`
  width: 100%;
  height: auto;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 20px;
  margin: 10px 0;
  padding: 15px 15px;
  span {
    display: inline-block;
  }
`;

const GridWarp = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-top: 20px;
`;

const GridItem = styled.div<{ isActive: boolean }>`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.bgColor)};
  border-radius: 10px;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 10px;
`;

interface RouterParams {
  coinId: string;
}

interface RouterState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface IRouterProps {}

function Coin({}: IRouterProps) {
  const { coinId } = useParams<RouterParams>();
  const { state } = useLocation<RouterState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchInfo(coinId));
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId], () =>
    fetchTickers(coinId)
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>{state ? state.name : loading ? "Loading..." : infoData?.id}</title>
      </Helmet>
      <Header>
        <Link to="/">
          <Back>back</Back>
        </Link>
        <Title>{state ? state.name : loading ? "Loading..." : infoData?.id}</Title>
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank : </span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol : </span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open_source : </span>
              <span>{infoData?.open_source === true ? "true" : "false"}</span>
            </OverviewItem>
          </Overview>
          <Description>
            <span>{infoData?.description}</span>
          </Description>
          <Overview>
            <OverviewItem>
              <span>Total_Supply : </span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max_Supply : </span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <GridWarp>
            <GridItem isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </GridItem>
            <GridItem isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </GridItem>
          </GridWarp>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
