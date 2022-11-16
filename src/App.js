import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import store from "./redux/store";
import Header from "./Header";

const truncate = (input, len) =>
    input.length > len ? `${input.substring(0, len)}...` : input;

const whitelistedAddresses = [];

const lowerCaseWhitelist = whitelistedAddresses.map((el) => el.toLowerCase());
const whitelistedFull = [...whitelistedAddresses, ...lowerCaseWhitelist];

export const StyledButton = styled.button`
  align-self: center;
  font-family: "Patrick Hand SC", cursive;
  background-color: #f7f8fa;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(245, 220, 255, 1) 4px 4px 1px 1px;
  box-sizing: border-box;
  color: #010606;
  border-color: #010606;
  cursor: pointer;
  display: inline-block;
  font-size: 2rem;
  line-height: 23px;
  outline: none;
  padding: 0.75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  :hover {
    transform: translate3d(0, -2px, 0);
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: #f7f8fa;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: black;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  color: #010606;
  border-color: #010606;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  box-shadow: rgba(245, 220, 255, 1) 4px 4px 1px 1px;
  -webkit-box-shadow: rgba(245, 220, 255, 1) 4px 4px 1px 1px;
  -moz-box-shadow: rgba(245, 220, 255, 1) 4px 4px 1px 1px;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  /* @media (max-width: 766px) {
    flex-direction: column; */
    /* flex-direction: column-reverse; */
  }
`;

export const StyledLogo = styled.img`
  width: 195px;
  @media (min-width: 767px) {
    width: 195px;
  }
  max-height: 100px;
  transition: width 0.5s;
  transition: height 0.5s;
  cursor: pointer;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  background-color: #66bcd7;
  height: auto;
  margin: 0 auto;
  max-width: 30rem;
  border-radius: 50%;
  box-shadow: 0 0 1rem 0.2rem black;
  /* transition: width 0.5s; */
`;

export const StyledCont = styled.div`
  /* width: 60%; */
  /* border: 2px solid black; */
  padding: 0 10rem 2rem 10rem;
  display: flex;
  justify-content: center;
  grid-gap: 3rem;
  flex-direction: row;
  align-items: center;
  @media (max-width: 766px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledLink = styled.a`
  color: black;
  text-decoration: none;
`;

function App() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [claimingNft, setClaimingNft] = useState(false);
    const [feedback, setFeedback] = useState(`Click MINT to mint your NFT.`);
    const [mintAmount, setMintAmount] = useState(1);
    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: "",
        SCAN_LINK: "",
        NETWORK: {
            NAME: "",
            SYMBOL: "",
            ID: 0,
        },
        NFT_NAME: "",
        SYMBOL: "",
        MAX_SUPPLY: 1,
        WEI_COST: 0,
        DISPLAY_COST: 0,
        GAS_LIMIT: 0,
        MARKETPLACE: "",
        MARKETPLACE_LINK: "",
        SHOW_BACKGROUND: false,
    });

    const claimNFTs = () => {
        let gasLimit = CONFIG.GAS_LIMIT;

        let totalGasLimit = String(gasLimit * mintAmount);

        console.log("Gas limit: ", totalGasLimit);
        setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
        setClaimingNft(true);
        blockchain.smartContract.methods.
            cost().
            call()
            .then(function (info) {
                let totalCostWei = String(info * mintAmount);
                blockchain.smartContract.methods
                    .mint(mintAmount)
                    .send({
                        gasLimit: String(gasLimit),
                        to: CONFIG.CONTRACT_ADDRESS,
                        from: blockchain.account,
                        value: totalCostWei,
                    })
                    .once("error", (err) => {
                        setFeedback("Opps not whitelisted or max mint amount reached.");
                        setClaimingNft(false);
                    })
                    .then((receipt) => {
                        console.log(receipt);
                        setFeedback(
                            `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
                        );
                        setClaimingNft(false);
                        dispatch(fetchData(blockchain.account));
                    });
            });




    };

    const decrementMintAmount = () => {
        let newMintAmount = mintAmount - 1;
        if (newMintAmount < 1) {
            newMintAmount = 1;
        }
        setMintAmount(newMintAmount);
    };

    const incrementMintAmount = () => {
        let newMintAmount = mintAmount + 1;
        if (newMintAmount > 3) {
            newMintAmount = 3;
        }
        setMintAmount(newMintAmount);
    };

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    };

    const getConfig = async () => {
        const configResponse = await fetch("/config/config.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const config = await configResponse.json();
        SET_CONFIG(config);
    };

    useEffect(() => {
        getConfig();
    }, []);

    useEffect(() => {
        getData();
    }, [blockchain.account]);

    return (
        <div >
            <Header />
           
            <s.Screen>
                <s.Container
                    flex={1}
                    ai={"center"}
                    style={{ padding: "24px 0 0 0", backgroundImage:`url("https://mint.ghostlers.io/images/background.gif")`, height:"70%", width:"80%" }}
                     
                ><br/><br/>
                    <h1
                        style={{
                            color: "white",
                            margin: "0",
                            textAlign: "center",
                            fontSize: "5rem",
                            textShadow: "0.3rem 0.3rem #f5dcff",
                            lineHeight: "5rem",
                            fontFamily: "Patrick Hand SC,cursive",
                            fontWeight: "700",
                        }}
                    >
                        
                        WE ARE GHOSTLERS
                    </h1>
                    <s.SpacerSmall />
                    <ResponsiveWrapper flex={1} style={{ padding: "24px 0" }}>
                        <s.Container flex={1} jc={"center"} ai={"center"}>
                            <StyledImg alt={"Ghostlers"} src={"/config/images/example.gif"} />
                        </s.Container>
                        <s.SpacerLarge />
                        <s.Container
                            flex={2}
                            jc={"center"}
                            ai={"center"}
                            style={{
                                padding: "2.4rem 2.4rem 0 2.4rem",
                                borderRadius: 24,
                            }}
                        >
                            <s.TextTitle
                                style={{
                                    textAlign: "center",
                                    fontSize: "4rem",
                                    fontWeight: "bold",
                                  
                                }}
                            >
                                {CONFIG.TITLE_ONE}
                            </s.TextTitle>
                            <s.TextTitle
                                style={{
                                    textAlign: "center",
                                    fontSize: 30,
                                    fontWeight: "bold",
                                   
                                }}
                            >
                                {CONFIG.TITLE_TWO}
                            </s.TextTitle>
                            <s.TextTitle
                                style={{
                                    textAlign: "center",
                                    fontSize: "25",
                                   
                                }}
                            >
                                {CONFIG.MAX_PER_WALLET}
                            </s.TextTitle>
                            <s.TextTitle
                                style={{
                                    textAlign: "center",
                                    fontSize: 50,
                                    fontWeight: "bold",
                                   
                                }}
                            >
                                {data.totalSupply !== 0
                                    ? `${data.totalSupply} / ${CONFIG.MAX_SUPPLY}`
                                    : `? / ${CONFIG.MAX_SUPPLY}`}
                            </s.TextTitle>
                            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
                                <>
                                    <s.TextTitle style={{ textAlign: "center" }}>
                                        The sale has ended.
                                    </s.TextTitle>
                                    <s.TextDescription
                                        style={{ textAlign: "center" }}
                                    >
                                        You can still find {CONFIG.NFT_NAME} on
                                    </s.TextDescription>
                                    <s.SpacerSmall />
                                    <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                                        {CONFIG.MARKETPLACE}
                                    </StyledLink>
                                </>
                            ) : (
                                <>
                                    <s.TextTitle style={{ textAlign: "center", }}>
                                            1 Ghostler cost you {data.cost} ETH
                                    </s.TextTitle>
                                    <s.TextDescription
                                        style={{ textAlign: "center" }}
                                    >
                                        (Excluding gas fees)
                                    </s.TextDescription>
                                    <s.SpacerSmall />
                                    {blockchain.account === "" ||
                                        blockchain.smartContract === null ? (
                                        <s.Container ai={"center"} jc={"center"}>
                                            <s.TextDescription
                                                style={{
                                                    textAlign: "center",
                                                    
                                                }}
                                            >
                                                Connect your Metamask wallet
                                            </s.TextDescription>
                                            <s.SpacerSmall />
                                            <StyledButton
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(connect());
                                                    getData();
                                                }}
                                            >
                                                CONNECT
                                            </StyledButton>
                                            {blockchain.errorMsg !== "" ? (
                                                <>
                                                    <s.SpacerSmall />
                                                    <s.TextDescription
                                                        style={{
                                                            textAlign: "center",
                                                           
                                                        }}
                                                    >
                                                        {blockchain.errorMsg}
                                                    </s.TextDescription>
                                                </>
                                            ) : null}
                                            <s.TextTitle
                                                style={{
                                                    textAlign: "center",
                                                    fontSize: 20,
                                                    fontWeight: "bold",
                                                    
                                                    paddingTop: 25,
                                                }}
                                            >
                                                {CONFIG.SOLD_OUT}
                                            </s.TextTitle>
                                        </s.Container>
                                    ) : (
                                        <>
                                            <s.TextDescription
                                                style={{
                                                    textAlign: "center",
                                                   
                                                }}
                                            >
                                                {feedback}
                                            </s.TextDescription>
                                            <s.SpacerMedium />
                                            <s.Container ai={"center"} jc={"center"} fd={"row"}>
                                                <StyledRoundButton
                                                    style={{ lineHeight: 0.4 }}
                                                    disabled={claimingNft ? 1 : 0}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        decrementMintAmount();
                                                    }}
                                                >
                                                    -
                                                </StyledRoundButton>
                                                <s.SpacerMedium />
                                                <s.TextDescription
                                                    style={{
                                                        textAlign: "center",
                                                       
                                                    }}
                                                >
                                                    {mintAmount}
                                                </s.TextDescription>
                                                <s.SpacerMedium />
                                                <StyledRoundButton
                                                    disabled={claimingNft ? 1 : 0}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        incrementMintAmount();
                                                    }}
                                                >
                                                    +
                                                </StyledRoundButton>
                                            </s.Container>
                                            <s.SpacerSmall />
                                            <s.Container ai={"center"} jc={"center"} fd={"row"}>
                                                <StyledButton
                                                    disabled={claimingNft ? 1 : 0}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        claimNFTs();
                                                        getData();
                                                    }}
                                                >
                                                    {claimingNft ? "MINTING" : "MINT"}
                                                </StyledButton>
                                            </s.Container>
                                        </>
                                    )}
                                </>
                            )}
                            <s.SpacerMedium />
                        </s.Container>
                    </ResponsiveWrapper>

                    <StyledCont>
                        {CONFIG.OPENSEA != "" ? (
                            <StyledButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(CONFIG.OPENSEA, "_blank");
                                }}
                                style={{
                                    width: 120,
                                    boxShadow: "#bcf0fb 4px 4px 1px 1px",
                                }}
                            >
                                OPENSEA
                            </StyledButton>
                        ) : null}
                        {CONFIG.SCAN_LINK != "" ? (
                            <StyledButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(CONFIG.SCAN_LINK, "_blank");
                                }}
                                style={{
                                    width: 120,
                                    boxShadow: "#bcf0fb 4px 4px 1px 1px",
                                }}
                            >
                                CONTRACT
                            </StyledButton>
                        ) : null}
                    </StyledCont>
                    <s.Container jc={"center"} ai={"center"} style={{ width: "100%" }}>
                        <s.TextDescription
                            style={{
                                textAlign: "center",
                               
                                paddingBottom: "4rem",
                            }}
                        >
                            Please make sure you are connected to the right network (
                            {CONFIG.NETWORK.NAME} Mainnet) and the correct address. <br />
                            Please note: Once you make the purchase, you cannot undo this
                            action.
                        </s.TextDescription>
                    </s.Container>
                </s.Container>
            </s.Screen>
        </div>
    );
}

export default App;
