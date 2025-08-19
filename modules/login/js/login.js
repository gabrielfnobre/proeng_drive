function iAmOneFlow(gt){
        gt.overlay_modal({fade_in: true})
        gt.box_container('of-overlay-modal', {
            box_content: [
                gt.close_button({close_btn_shadow: 'true'}),
                gt.text({text_content: `
                    <h1 style="color: #12ab12">Bem-vindo<br>ao OneFlow 🚀</h1>
                    <p>
                        O OneFlow foi criado para facilitar a coleta e o trânsito de informações entre os departamentos da empresa 🏭.<br><br>
                        
                        Com ele, você preenche dados de forma simples, acompanha status de solicitações com agilidade e garante que todos estejam sempre atualizados!<br><br>
                        
                        <span style="color: #12ab12"><b>Mais agilidade, organização e transparência para o seu dia a dia.</b></span> 😉
                    </p>
                `,
                style: "text-align: left"
                }),
            ],
            width_desktop: "60%",
        })
}

function remindMyPassword(gt){
        gt.overlay_modal()
        gt.box_container('of-overlay-modal', {
            width_desktop: "30%",
            width_mobile: "90%",
            box_content: [
                gt.close_button({close_btn_shadow: true}),
                gt.text({
                    width_desktop: "100%",
                    text_content: `
                    <h1>Recupere sua senha por e-mail 📧</h1>
                    <p>
                        Informe seu CPF logo abaixo<br>Se ele estiver cadastrado em nosso sistema, enviaremos sua senha para o seu e-mail cadastrado. 😉
                    </p>
                    `,
                    style: "text-align: left"
                }),
                gt.input_cpf({width_desktop: "100%"}),
                gt.button({text: "Verificar CPF", width_desktop: "100%"})
            ]
        })
}

function signIn(gt){
    window.location.href = "./modules/dashboard/pages/dashboard.html"
}

export {
    iAmOneFlow,
    remindMyPassword,
    signIn,
}