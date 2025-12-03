export default function Projects({ exitfn, texts }) {
    return (
        <div className="projects">

            <button onClick={() => exitfn(false)}>
                <img src="/crossIcon.svg" alt="" style={{ height: "35px" }} />
                <span>{texts.back}</span>
            </button>

            <h2>{texts.projectsTitle}</h2>

            <section>
                <h3>
                    <img src="/thub.png" alt="" /> {texts.tizonaTitle}
                </h3>
                <hr />

                <p>{texts.tizonaDescription1}</p>

                <p>
                    {texts.tizonaDescription2}{" "}
                    <b>Python</b>, <b>Javascript</b>, <b>React</b>, <b>Node</b>, <b>Express</b>, <b>MySQL</b>
                </p>

                <p>
                    <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/n5GNUHm5z2k">
                        {texts.tizonaInstallTutorial}
                    </a>
                </p>

                <p>
                    <a target="_blank" rel="noopener noreferrer" href="https://tizonahub.com">
                        {texts.tizonaOfficialPage}
                    </a>
                </p>

                <div className="thubImages">
                    <img src="/tizonaWebOnDevices.png" alt="" />
                    <img src="/filesShot.png" alt="" />
                </div>
            </section>

            <section>
                <h3>{texts.finalProjectTitle}</h3>
                <hr />

                <p>{texts.finalProjectDescription1}</p>

                <p>
                    <a href="https://github.com/pmarmor/dawp2324a04" target="_blank" rel="noopener noreferrer">
                        {texts.finalProjectGithub}
                    </a>
                </p>
            </section>
        </div>
    );
}
