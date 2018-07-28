package cn.fanrt.purchase.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: fanrt
 * @Description:
 * @create: 2018-07-20 18:27
 **/
@Controller
@RequestMapping("/common")
public class MainController {

    @RequestMapping("/main.do")
    public String caseTypeList() {
        return "baseview/main";
    }
}
