import "./styles/Footer.css";
import * as s from "./styles/globalStyles";


const Header = () => {
    return (
        <>


            <footer class="new_footer_area bg_color">
           
                <div class="new_footer_top">
                    <s.Container jc={"center"} ai={"center"} style={{ width: "100%", color: "black",padding:"0px 40px 60px 40px" }}>
                        <s.TextDescription
                            style={{
                                textAlign: "center",
                                fontSize: "2.3rem",
                                marginTop:"30px"
                                
                            }}
                        >
                            Please make sure you are connected to the right network (Ethereum) and the correct whitlisted address. <br />

                        </s.TextDescription>
                    </s.Container>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 col-md-6">
                                <div class="f_widget company_widget wow fadeInLeft animation2sec" data-wow-delay="0.2s" >
                                    <h3 class="f-title f_600 t_color f_size_18">Get in Touch</h3>
                                    <p class="f_size_18">Don&#39;t miss any updates of GHOSTLERS Metaverse Nft's and Crypto.</p>
                                  
                            </div>
                                </div>
                                <div class="col-lg-3 col-md-6">
                                    <div class="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.4s" >
                                    <h3 class="f-title f_600 t_color f_size_18">Resources</h3>
                                    <ul class="list-unstyled f_list f_size_18">
                                        <li><a href="#">FAQ</a></li>
                                        <li><a href="#">Whitepaper</a></li>
                                        <li><a href="#">Support</a></li>
                                          
                                            
                                        </ul>
                                    </div>
                                </div>
                               
                                <div class="col-lg-3 col-md-6">
                                    <div class="f_widget social-widget pl_70 mt-4 wow fadeInLeft" data-wow-delay="0.8s" >
                                        <h3 class="f-title f_600 t_color f_size_18">Socials</h3>
                                        <div class="f_social_icon">
                                            <a href="#" class="fab fa-facebook"></a>
                                            <a href="#" class="fab fa-twitter"></a>
                                            <a href="#" class="fab fa-discord"></a>
                                            <a href="#" class="fab fa-instagram"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer_bg">
                            <div class="footer_bg_one"></div>
                            <div class="footer_bg_two"></div>
                        </div>
                </div>

                    <div class="footer_bottom">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-lg-6 col-sm-7">
                                <p class="mb-0 f_400 f_size_18">&#169; GHOSTLERS Inc.. 2022 All rights reserved.</p>
                                </div>
                              
                            </div>
                        </div>
                    </div>
        </footer>
        </>
    );
};

export default Header;
