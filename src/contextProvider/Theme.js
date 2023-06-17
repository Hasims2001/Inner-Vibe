import { extendTheme, theme as base, withDefaultColorScheme, withDefaultVariant } from "@chakra-ui/react";
import {mode} from '@chakra-ui/theme-tools';
const changingBorder ={
    variants:{
        filled:{
            field:{
                backgroundColor : 'brand.200',
                borderColor : 'brand.400',
               
                rounded: 'md',
                _hover : 'disabled',
                // _focus:{
                //     borderColor : 'brand.100',
                // }
            }
        },
    }
}
const Theme = extendTheme({

    colors: {
        brand:{
            100:"#121212", //dark black
            // 200:"#1c1c1c", //light black
            200:"#2d2d2d", //light black
            300:"#F6FF96", //yellow
            400:"#86FFA3", //light green
            500:"#5BD7FC", //light blue
            600:"#FFFFFF", //white
            700:"#3c3c3c" //light gray
        }
    },
    fonts: {
        heading : `Work Sans, ${base.fonts.heading}`,
        body : `Work Sans, ${base.fonts.body}`

    },
    bgGradient:{
      temp:{
        primy : "linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )"
      }
    },
   
    components : {
       
        Button : {
            variants:{
                SimplePrimary:(props) =>({
                    rounded : "md",
                    // _focus : {
                    //     ring:2,
                    //     ringColor : "brand.400"
                    // },
                     backgroundColor : mode("brand.700", "brand.600")(props),
                     color : mode("brand.600", "brand.100")(props),
                    // _hover :{
                    // }
                }),
                GradientPrimary:(props) =>({
                    rounded : "md",
                    _focus : {
                        ring:2,
                        ringColor : "brand.700"
                    },
                     bgGradient: mode("linear(to-r, #5BD7FC,#86FFA3, #F6FF96 )")(props),
                     color : mode("brand.100", "brand.600")(props),
                     _hover:{ 
                        background: mode("disabled")(props),
                        
                    },
                     _active:{ 
                        background: mode("disabled")(props),
                        
                    },
                    // _hover :{
                    // }
                }),
            }
        },
        Textarea:{
            variants:{
                filled:{
                    field:{
                        _focus:{
                            borderColor : 'brand.400',
                        }
                    }
                },
            }
        },
        Input:{
            ...changingBorder
        },
        DebounceInput:{
            ...changingBorder
        },
        Select :{
            ...changingBorder
        },
         Checkbox:{
             baseStyle:{
                control:{
                    _focus:{
                        ring : 2,
                        ringColor : "brand.400"
                    }
                }
             }
         }
    }

}, withDefaultColorScheme({
    colorScheme: "brand",
    
}),
withDefaultVariant({
    variant: 'filled',
    components : ["Input", "Select", "Textarea"],
})
);

export default Theme;