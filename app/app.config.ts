// app/app.config.ts
export default defineAppConfig({
    ui: {
        primary: 'primary',
        gray: 'deepgrey',
        background: 'background',
        colors: {
            primary: '#FFBC42',
            surface: '#FEF6F2',
            text: '#000000',
            background: '#FFFFFF',
            blue: '#0466C8',
            green: '#226F54',
            celeste: '#006D77',
            deepgrey: '#353535',
            lightgrey: '#C1C1C1'
        },

        // ✅ Per-component config (no `default` key)
        button: {
            slots: {
                base: 'font-[Poppins] rounded-2xl',
                label: 'text-[17px] leading-[1.6]'
            },
            variants: {
                color: {
                    primary: 'bg-primary text-background hover:bg-blue',
                    ghost: 'bg-transparent text-primary hover:bg-surface'
                },
                size: {
                    sm: 'px-3 py-1.5 text-[13px]',
                    md: 'px-4 py-2 text-[17px]',
                    lg: 'px-5 py-2.5 text-[21px]'
                }
            },
            defaultVariants: {
                color: 'primary',
                size: 'md'
            }
        }
    }
})
