function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

// 中序遍历
var inorderTraversal = function(root) {
  if (!root) {
    return []
  }
  const res = []
  const stack = []
  let p = root
  while (stack.length || p) {
    while (p) {
      stack.push(p)
      p = p.left
    }
    const t = stack.pop()
    console.log(t.val)
    p = t.right
  }
}

var hasPathSum = function(root, targetSum) {
  if (!root) {
    return false
  }
  const stack = []
  stack.push([root, 0])
  while (stack.length) {
    const [t, v] = stack.pop()
    if (!t.left && !t.right) {
      // 叶子节点
      if (t.val + v === targetSum) {
        return true
      }
    }
    t.left && stack.push([t.left, t.val + v])
    t.right && stack.push([t.right, t.val + v])
  }
  return false
}

const json = {
  a: { b: { c: 1 } },
  d: [2, 3],
}

function travel(json) {
  if (typeof json !== 'object') return
  for (let key in json) {
    console.log(json[key])
    travel(json[key])
  }
}

export const arrs = [
  {
    area: '北京',
    remark: '北京B证查询网址',
    websiteName: '北京B证查询网址',
    webURL: 'http://bjjs.zjw.beijing.gov.cn/eportal/ui?pageId=308888',
  },
  {
    area: '河南',
    remark: '河南职称网查网址',
    websiteName: '河南职称网查网址',
    webURL: 'http://hrss.henan.gov.cn/chaxun/toGetZhicheng.do',
  },
  {
    area: '湖南',
    remark: '湖南长沙职称网查',
    websiteName: '湖南长沙职称网查',
    webURL: 'http://www.cs12333.com/Online/searchZj.jsp',
  },
  {
    area: '山西',
    remark: '山西职称网查',
    websiteName: '山西职称网查',
    webURL: 'http://jzgr.sxjsjy.cn/Search1.aspx',
  },
  {
    area: '青岛',
    remark: '青岛网查',
    websiteName: '青岛网查',
    webURL: 'http://hrss.qingdao.gov.cn/n28356070/index.html',
  },
  {
    area: '南京',
    remark: '南京市网查',
    websiteName: '南京市网查',
    webURL: 'http://218.94.85.5:8315/ww/f/a/wwfa_cont.html',
  },
  {
    area: '鹰潭',
    remark: '鹰潭市网查',
    websiteName: '鹰潭市网查',
    webURL: 'http://117.41.182.10:7100/',
  },
  {
    area: '烟台',
    remark: '烟台市网查',
    websiteName: '烟台市网查',
    webURL: 'http://218.56.32.79:8087/web/zyjnjd',
  },
  {
    area: '内蒙',
    remark: '内蒙古网查',
    websiteName: '内蒙古网查',
    webURL: 'https://www.nmgrck.cn/zcps/front/index.shtml',
  },
  {
    area: '江西',
    remark: '江西上饶网查',
    websiteName: '江西上饶网查',
    webURL: 'http://zs.srhrss.gov.cn/',
  },
  {
    area: '福建',
    remark: '福建网查',
    websiteName: '福建网查',
    webURL: 'http://rst.fujian.gov.cn/fw/bmfwcx/zyjsryzczscx/',
  },
  {
    area: '辽宁',
    remark: '辽宁大连网查',
    websiteName: '辽宁大连网查',
    webURL: 'http://124.93.240.21:7025/hrrczxw/',
  },
  {
    area: '湖北',
    remark: '湖北黄石网查',
    websiteName: '湖北黄石网查',
    webURL: 'http://www.hsrsksy.com.cn/',
  },
  {
    area: '深圳',
    remark: '深圳网查',
    websiteName: '深圳网查',
    webURL: 'http://hrss.sz.gov.cn/',
  },
  {
    area: '湖南',
    remark: '湖南网查',
    websiteName: '湖南网查',
    webURL: 'http://www.hnjsrcw.com/QueryCert.html',
  },
  {
    area: '湖南',
    remark: '湖南建设人力资源网',
    websiteName: '湖南建设人力资源网',
    webURL: 'http://www.hnjsrcw.com/',
  },
  {
    area: '安徽',
    remark: '安徽B证查询网址',
    websiteName: '安徽B证查询网址',
    webURL: 'http://dohurd.ah.gov.cn/site/tpl/4071?peopleType=agry',
  },
  {
    area: '河北',
    remark: '河北职称网查网址',
    websiteName: '河北职称网查网址',
    webURL: 'http://www.hbzwfw.gov.cn/hbzw/renshe/index.do',
  },
  {
    area: '上海',
    remark: '上海B证',
    websiteName: '上海B证',
    webURL: 'http://www.jsaqxh.sh.cn/',
  },
  {
    area: '福建',
    remark: '福建B证',
    websiteName: '福建B证',
    webURL:
      'http://220.160.52.164:96/ConstructionInfoPublish/Pages/Manager.aspx',
  },
  {
    area: '陕西',
    remark: '陕西职称',
    websiteName: '陕西职称',
    webURL: 'http://www.sxjsrcggfw.com/a/chengjizhengshuchaxun/',
  },
  {
    area: '上海',
    remark: '上海职称',
    websiteName: '上海职称',
    webURL: 'http://www.rsj.sh.gov.cn/xxcx_rclh/zczs',
  },
  {
    area: '广东',
    remark: '广东B',
    websiteName: '广东B',
    webURL: 'http://www.gdcic.net/KHGL/CertificateReport.aspx',
  },
  {
    area: '湖南',
    remark: '湖南B',
    websiteName: '湖南B',
    webURL: 'http://gcxm.hunanjs.gov.cn/dataservice.html',
  },
  {
    area: '河北',
    remark: '河北石家庄网查',
    websiteName: '河北石家庄网查',
    webURL: 'http://gcxm.hunanjs.gov.cn/dataservice.html',
  },
  {
    area: '北京',
    remark: '北京职称网查',
    websiteName: '北京职称网查',
    webURL: 'http://www.zgzcgg.com.cn/',
  },
  {
    area: '广东',
    remark: '广东职称网查',
    websiteName: '广东职称网查',
    webURL: 'http://www.gdhrss.gov.cn/gdweb/ggfw/web/pub/ggfwzyjs.do',
  },
  {
    area: '广西',
    remark: '广西职称网查',
    websiteName: '广西职称网查',
    webURL: 'https://www.gxrczc.com/',
  },
  {
    area: '广西',
    remark: '广西南宁职称网查',
    websiteName: '广西南宁职称网查',
    webURL: 'https://hr.nn12333.com:9100/zc/ww/wwaaindex.html',
  },
  {
    area: '注册',
    remark: '注册咨询师登录系统网址',
    websiteName: '注册咨询师登录系统网址',
    webURL: 'http://bms.cnaec.com.cn/engineer/a/login',
  },
  {
    area: '注册',
    remark: '注册咨询师继续教育网址',
    websiteName: '注册咨询师继续教育网址',
    webURL: 'https://jxjy.cdeledu.com/cdel_jxjy/qgzxgcs.shtml',
  },
  {
    area: '广东',
    remark: '广东三库网址',
    websiteName: '广东三库网址',
    webURL: 'http://113.108.219.36:8003/',
  },
  {
    area: '福建',
    remark: '福建二建网址',
    websiteName: '福建二建网址',
    webURL: 'http://60.208.116.167/jzsZcgl/client/login/frontlogin.htm',
  },
  {
    area: '全国',
    remark: '监理继续教育',
    websiteName: '监理继续教育',
    webURL: 'https://henanjs.ok99ok99.com/train/hn2/index.aspx',
  },
  {
    area: '全国',
    remark: '造价个人系统',
    websiteName: '造价个人系统',
    webURL: 'http://zaojiasys.jianshe99.com/cecaopsys/',
  },
  {
    area: '全国',
    remark: '造价继续教育',
    websiteName: '造价继续教育',
    webURL: 'http://www.ccea.pro/',
  },
  {
    area: '全国',
    remark: '注册安全工程师注册管理系统',
    websiteName: '注册安全工程师注册管理系统',
    webURL: 'http://rmocse.chinasafety.ac.cn/',
  },
  {
    area: '辽宁',
    remark: '辽宁二建继续教育网址',
    websiteName: '辽宁二建继续教育网址',
    webURL: 'http://218.60.144.236/',
  },
  {
    area: '辽宁',
    remark: '辽宁二建网址',
    websiteName: '辽宁二建网址',
    webURL: 'http://221.180.200.235:8085/jzsgl/Portal/Index.aspx',
  },
  {
    area: '辽宁',
    remark: '辽宁B等',
    websiteName: '辽宁B等',
    webURL: 'http://zjt.ln.gov.cn/',
  },
  {
    area: '吉林',
    remark: '吉林B证',
    websiteName: '吉林B证',
    webURL: 'https://jy.jlsjsxxw.com/ZhengshuSearch.aspx',
  },
  {
    area: '浙江',
    remark: '浙江政务网',
    websiteName: '浙江政务网',
    webURL: 'http://223.4.65.131:8080/#/personnel',
  },
  {
    area: '青海',
    remark: '青海职称',
    websiteName: '青海职称',
    webURL: 'http://139.170.150.135/dataservice/query/staff/staffDetail/',
  },
]
