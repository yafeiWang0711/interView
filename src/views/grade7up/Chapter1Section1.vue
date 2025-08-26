<template>
  <div class="section-content">
    <h2 class="section-title">1.1 正数和负数</h2>
    <div class="paragraph">
      <p>
          数的产生和发展离不开生活和生产的需要。人们对于数的认识就是伴随着记数、测量、运算等方面的需求不断拓展的（图1-1-1）。在小学，我们学过自然数、分数和小数。它们都是大于或等于0的数，但是在日常生活和生产实践中，为了表达和运算的需要，还有必要引入一类新的数。
      </p>
      <div class="image1.1-1">
        <img src="@/assets/grade7up/1.1-1.png" width="100%" v-viewer />
        <div style="text-align:center">图1.1-1</div>
      </div>
      <div style="display: flex;">
        <div style="width: 75%;">

          <p>  在本章习言的问题中，温度比0℃高，称为零上温度，温度比0℃低，称为零下温度。零上温度和零下温度是以0℃为分界点的具有相对意义的量。．从图1.1-2的天气预报中可以看出，零
            上３摄氏度用 3℃表示，零下３摄氏度则用-3℃表示，这里出
            现了 “-3”．类似地，盈利额和亏损额是具有相反意义的量，如
            果用50万元表示盈利50万元，就可以用－10万元表示亏损10
            万元；增长的百分率和减少的百分率是具有相反意义的量，如果
            用7.8％表示增长7.8％，就可以用－0.7％表示减少0.7％．</p>

        </div>
        <div style="width: 25%;text-align: center;margin-top: 20px;">
          <img src="@/assets/grade7up/1.1-2.png" style="height: 160px;" v-viewer />
          <div style="text-align:center">图1.1-2</div>
        </div>

      </div>
      <p>
          在数学中，像3.50、7.8%这样大于0的数叫作正数，像-3、-10、-0.7这样在正数前面加上符号“-”的数叫作负数，其中符号“-”是负号，读作“负”，有时，为了明确表达与负数的相反意义，在正数的前面加上符号“+”（读作“正”），例如+1
        800、+3、+0.5、
        <MathJax :content="'\\frac{1}{2}'" />…就是1 800、3、0.5、
        <MathJax :content="'\\frac{1}{2}'" />…一个数前面的“+”“-”号叫作这个数的符号。
      </p>
      <h3>0既不是正数，也不是负数。</h3>
    </div>

    <ExampleCard title="溯源">

      <div style="display: flex;">
        <div style="width: 60%;margin-left: 30px;">
          我国历史上最早认识和使用负数的国家。至迟成书于东汉早期（约1世纪）的数学专著《九章算术》、《海岛算经》中就提出了正数、负数的概念及其加减运算法则，如关于筹码实物的分人题，使用“正分”来表示“实分予人”，用“负分”来表示“实分取于人”。宋代数学家秦九韶在《数书九章》中，采用红色筹码和黑色筹码分别表示正数和负数，红色为正，黑色为负。
        </div>
        <div style="width: 15%;margin-left: 30px;">
          <img src="@/assets/grade7up/1.1-21.png" style="width: 150px;" v-viewer />
          <div style="text-align: center;">
            我国古代用算筹来记记数和计算
          </div>
        </div>
      </div>

    </ExampleCard>

    <ExampleCard title="例1">
      <div>如果一个问题中出现具有相反意义的量，就可以用正数和负数分别表示它们．</div>
      <div class="card-title"><span class="iconfont">📘</span> 例1</div>
      <div class="example-content">
        某校组织学生去劳动实践基地采摘橘子，并称重。某同学一箱橘子的标准质量为2.5kg。如果用正数表示超过标准质量的克数，那么：
        <ul>
          <li>（1）比标准质量多65g和比标准质量少30g各怎么表示？</li>
          <li>（2）50g，-27g各表示什么含意？</li>
        </ul>
        <div class="example-answer">
          <b>解：</b><br>
          （1）比标准质量多65g用+65g表示，比标准质量少30g用-30g表示；<br>
          （2）50g表示箱橘子的质量比标准质量多50g，-27g表示箱橘子的质量比标准质量少27g。
        </div>
      </div>
    </ExampleCard>
    <ExerciseCard title="练习">
      <div class="exercise-group">
        <div class="exercise-item">
          <div class="ex-num-circle">1</div>
          <div class="ex-body">
            <div class="ex-q">指出下面各数中的正数、负数：</div>
            <div class="ex-math-list">
              <MathJax :content="'\\frac{4}{3}'" />，-1，2.5，<MathJax :content="'+\\frac{1}{4}'" />，0，-3.14，120，<MathJax :content="'-\\frac{2}{7}'" />
            </div>
            <div class="ex-input-row">
              <span>正数：</span><el-input v-model="userAns1.pos" size="small" class="ex-input" placeholder="用逗号分隔" />
              <span style="margin-left:12px;">负数：</span><el-input v-model="userAns1.neg" size="small" class="ex-input"
                placeholder="用逗号分隔" />
              <el-button @click="checkAns1" size="small" class="ex-btn">检查</el-button>
              <transition name="fade"><span v-if="result1 !== null" :class="result1 ? 'ex-correct' : 'ex-wrong'">{{
                result1 ?
                  '✔ 正确' : '✘ 错误' }}</span></transition>
            </div>
          </div>
        </div>
        <div class="exercise-item">
          <div class="ex-num-circle">2</div>
          <div class="ex-body">
            <div class="ex-q">如果80 m表示向右走80 m，水位变成60 m，那么____表示向左走60 m。</div>
            <div class="ex-input-row">
              <el-input v-model="userAns2" size="small" class="ex-input short" placeholder="填写答案" /> m
              <el-button @click="checkAns2" size="small" class="ex-btn">检查</el-button>
              <transition name="fade"><span v-if="result2 !== null" :class="result2 ? 'ex-correct' : 'ex-wrong'">{{
                result2 ?
                  '✔ 正确' : '✘ 错误' }}</span></transition>
            </div>
          </div>
        </div>
        <div class="exercise-item">
          <div class="ex-num-circle">3</div>
          <div class="ex-body">
            <div class="ex-q">某天，月球表面白天的最高温度为零上126 ℃，如果把它记作126 ℃，那么夜间的最低温度零下150 ℃记作_____℃。</div>
            <div class="ex-input-row">
              <el-input v-model="userAns3" size="small" class="ex-input short" placeholder="填写答案" /> ℃
              <el-button @click="checkAns3" size="small" class="ex-btn">检查</el-button>
              <transition name="fade"><span v-if="result3 !== null" :class="result3 ? 'ex-correct' : 'ex-wrong'">{{
                result3 ?
                  '✔ 正确' : '✘ 错误' }}</span></transition>
            </div>
          </div>
        </div>
        <div class="exercise-item">
          <div class="ex-num-circle">4</div>
          <div class="ex-body">
            <div class="ex-q">在足球比赛中，如果甲队进3个球，记作+3个，那么甲队只丢2个球，记作_____个。</div>
            <div class="ex-input-row">
              <el-input v-model="userAns4" size="small" class="ex-input short" placeholder="填写答案" /> 个
              <el-button @click="checkAns4" size="small" class="ex-btn">检查</el-button>
              <transition name="fade"><span v-if="result4 !== null" :class="result4 ? 'ex-correct' : 'ex-wrong'">{{
                result4 ?
                  '✔ 正确' : '✘ 错误' }}</span></transition>
            </div>
          </div>
        </div>
      </div>
      <el-button @click="showAnswer1 = !showAnswer1" type="primary" size="small" class="answer-btn">
        {{ showAnswer1 ? '隐藏答案' : '查看答案' }}
      </el-button>
      <el-collapse v-model="answerActive1" class="answer-collapse">
        <el-collapse-item name="1">
          <div class="answer-content">答案：<br>
            1.
            正数：<MathJax :content="'\\frac{4}{3}'" />，2.5，<MathJax :content="'+\\frac{1}{4}'" />，120；负数：-1，-3.14，<MathJax :content="'-\\frac{2}{7}'" /><br>
            2. -60 m<br>
            3. -150 ℃<br>
            4. -2
          </div>
        </el-collapse-item>
      </el-collapse>
    </ExerciseCard>
    <div class="other" style="margin-top: 40px;">
      <p>  把0以外的数分为正数和负数，它们表示具有相反意义的量。随着人们对正数、负数意义认识的加深，正数和负数在实践中得到了广泛应用。例如，在表示某地的高度时，通常以海平面为基准；用0
        m表示海平面的海拔，用正数表示高于海平面的海拔，用负数表示低于海平面的海拔。我国水准零点位于山东省青岛市（图1.1-3是“中华人民共和国水准零点”标志）；世界最高峰珠穆朗玛峰的海拔为8 848.86
        m；我国陆地海拔最低处位于新疆吐鲁番盆地的艾丁湖，其海拔为-154.31 m。</p>
      <div style="display: flex;">
        <div style="margin-left: 100px;">
          <img src="@/assets/grade7up/1.1-3.png" style="width: 300px;" v-viewer />
          <div style="text-align:center">图1.1-3</div>
        </div>
        <div class="note-style">
          0是正数与负数的分界。0℃是一个确定的温度，海拔0 m是一个确定的海拔。0已不只是表示“没有”。
        </div>
      </div>

    </div>
    <ThinkingCard title="思考">
      <div>图1-4是地理中的分层设色地形图，图1-5是手机中的部分收支款账单，其中的正数和负数的意义分别是什么？你能再举一些正数、负数表示具有相反意义的量的例子吗？</div>
      <div class="img-row">
        <div style="margin-left: 50px;">
          <img src="@/assets/grade7up/1.1-4.png" style="height: 200px;" v-viewer />
          <div style="text-align:center">图1.1-4</div>
        </div>

        <div style="margin-left: 100px;">
          <img src="@/assets/grade7up/1.1-5.png" style="height: 200px;" v-viewer />
          <div style="text-align:center">图1.1-5</div>
        </div>
      </div>
    </ThinkingCard>
    <ExampleCard title="例2">

      <div class="example-content">
        （１）一个月内，李明体重增加1.2kg，张华体重减少0.5kg，刘伟体重无变化，写出他们这个月的体重增长值．
      </div>
      <div class="example-content">
        （２）四种品牌的手机今年第二季度的销售量与第一季度相比，变化率如下：
      </div>
      <div class="example-content">
            Ａ品牌减少２％，Ｂ品牌增长４％，Ｃ品牌增长１％，Ｄ品牌减少３％．
      </div>
      <div class="example-content">
            写出今年第二季度这些品牌的手机销售量的增长率．
      </div>

      <div class="example-answer">
        <b>解：</b><br>
        （１）这个月李明体重增长１．２ｋｇ，张华体重增长－０．５ｋｇ，刘伟体重
        增长０ｋｇ．
        <br>
        （２）四种品牌的手机今年第二季度销售量的增长率是：
        <br>
        <div style="margin-left: 100px;">
          Ａ品牌　－２％，<br>Ｂ品牌　４％，<br>Ｃ品牌　１％，<br>
          Ｄ品牌　－３％．
        </div>

      </div>
    </ExampleCard>
    <ExerciseCard title="练习" style="margin-top: 40px;">
      <div class="exercise-group">
        <div class="exercise-item">
          <div class="ex-num-circle">1</div>
          <div class="ex-body">
            <div class="ex-q">如果水库的水位升高3 m时，水位变化记作+3 m，那么水位下降3 m时，水位变化记作 <el-input v-model="ex6ans1_1" size="small"
                class="ex-input short" placeholder="填写答案" /> m，水位不升不降时，水位变化记作 <el-input v-model="ex6ans1_2" size="small"
                class="ex-input short" placeholder="填写答案" /> m。</div>
            <el-button @click="checkEx6_1" size="small" class="ex-btn">检查</el-button>
            <transition name="fade"><span v-if="ex6result1 !== null" :class="ex6result1 ? 'ex-correct' : 'ex-wrong'">{{
              ex6result1 ? '✔ 正确' : '✘ 错误' }}</span></transition>
          </div>
        </div>
        <div class="exercise-item">
          <div class="ex-num-circle">2</div>
          <div class="ex-body">
            <div class="ex-q">一袋面粉的标准质量是10 kg。如果比标准质量多0.1 kg记作+0.1 kg，那么-0.1 kg、0 kg、+0.5 kg分别表示什么？</div>
            <div class="ex-input-row">
              <span>-0.1 kg：</span><el-input v-model="ex6ans2_1" size="small" class="ex-input short"
                placeholder="填写答案" />
              <span style="margin-left:12px;">0 kg：</span><el-input v-model="ex6ans2_2" size="small"
                class="ex-input short" placeholder="填写答案" />
              <span style="margin-left:12px;">+0.5 kg：</span><el-input v-model="ex6ans2_3" size="small"
                class="ex-input short" placeholder="填写答案" />
              <el-button @click="checkEx6_2" size="small" class="ex-btn">检查</el-button>
              <transition name="fade"><span v-if="ex6result2 !== null"
                  :class="ex6result2 ? 'ex-correct' : 'ex-wrong'">{{ ex6result2 ? '✔ 正确' : '✘ 错误' }}</span></transition>
            </div>
          </div>
        </div>
        <div class="exercise-item">
          <div class="ex-num-circle">3</div>
          <div class="ex-body">
            <div class="ex-q">若规定商品涨价为正，则甲商品涨价10%可以记作 <el-input v-model="ex6ans3_1" size="small" class="ex-input short"
                placeholder="填写答案" /> ，乙商品降价5%可以记作 <el-input v-model="ex6ans3_2" size="small" class="ex-input short"
                placeholder="填写答案" /> 。</div>
            <el-button @click="checkEx6_3" size="small" class="ex-btn">检查</el-button>
            <transition name="fade"><span v-if="ex6result3 !== null" :class="ex6result3 ? 'ex-correct' : 'ex-wrong'">{{
              ex6result3 ? '✔ 正确' : '✘ 错误' }}</span></transition>
          </div>
        </div>
      </div>
      <el-button @click="showEx6Answer = !showEx6Answer" type="primary" size="small" class="answer-btn">
        {{ showEx6Answer ? '隐藏答案' : '查看答案' }}
      </el-button>
      <el-collapse v-model="ex6AnswerActive" class="answer-collapse">
        <el-collapse-item name="1">
          <div class="answer-content">答案：<br>
            1. -3，0<br>
            2. -0.1 kg 表示比标准质量少0.1 kg；0 kg 表示与标准质量相等；+0.5 kg 表示比标准质量多0.5 kg。<br>
            3. +10%，-5%
          </div>
        </el-collapse-item>
      </el-collapse>
    </ExerciseCard>
    <!-- 新增：习题1.1 -->
    <BorderCard customClass="exercise-border-card">
      <template #title>
        <span>习题 1.1</span>
      </template>
      <div style="color:#1e88c7;font-weight:bold;font-size:1.12rem;margin-bottom:6px;">复习巩固 ▶</div>
      <ol style="margin-left:1.2em;">
        <li>指出下面各数中的正数、负数：<br>
          <span style="display:inline-block;margin-top:4px;">
            5，
            <MathJax :content="'-\\frac{5}{7}'" />，
            0.56，
            -3，
            -25.8，
            <MathJax :content="'\\frac{12}{5}'" />，
            -0.0001，
            <MathJax :content="'+2'" />，
            -600。
          </span>
        </li>
        <li>某年，我国全年平均降水量比上年增加53.5 mm，接下来的第二年比上年减少81.5 mm，第三年比上年增加108.7 mm。用正数和负数表示这三年我国全年平均降水量比上年的增长量。</li>
        <li>“不是正数的数一定是负数，不是负数的数一定是正数”的说法对吗？为什么？</li>
      </ol>
      <div style="color:#1e88c7;font-weight:bold;font-size:1.12rem;margin:10px 0 6px 0;">综合运用 ▶</div>
      <ol start="4" style="margin-left:1.2em;">
        <li>科学实验表明，原子的原子核与核外电子所带电荷是两种相反的电荷。物理学中规定，原子核所带电荷为正电荷，核外电子所带电荷为负电荷。氢原子的原子核与核外电子各带一个电荷，把它们所带电荷用正数和负数表示出来。</li>
        <li>如果把一个物体向后后方移动5 m记作移动-5 m，那么这个物体又移动了+5 m是什么意思？这种物体距离两次移动前的位置多远？</li>
        <li>
          在测量某些量（如长度、质量、时间）时会产生误差，有时采用多次测量求平均值的方法可以减小误差。某班七组同学分别测量同一座楼的高度，测得的数据（单位：m）分别是：79.4，80.6，80.8，79.1，80.9，80.5。这些数据的平均值是多少？以平均值为标准，用正数表示超出的部分，用负数表示不足的部分，它们对应的数分别是什么？
        </li>
      </ol>
      <div style="color:#1e88c7;font-weight:bold;font-size:1.12rem;margin-bottom:6px;">拓广探索 ▶</div>
      <ol start="7" style="margin-left:1.2em;">
        <li>某地一天中午12时的气温是7℃，过5 h气温下降了4℃，再过7 h气温又下降了4℃，第二天0时的气温是多少？</li>
        <li>
          <div style="display: flex;">
            <div style="width: 80%;">
              <p>
                如图是一种转盘型密码锁，每次开锁时需要先把表示“0”的刻度线与固定盘上的标记线对齐，再按顺时针或逆时针方向旋转若干刻度的转盘三次。例如，按逆时针方向旋转5个小格记为“-5”，此时标记线对准的数是5，再顺时针旋转2个小格记为“+2”，再逆时针旋转3个小格记为“-3”。你可以问开锁码记为“-5，+2，-3”时，锁打开时标记线对准的刻度线表示哪个数？如果一组开锁密码为“-15，+10，-5”，要想打开锁，应如何旋转锁盘？锁打开时标记线对准的刻度线表示哪个数？
              </p>
            </div>
            <div style="margin-left: 20px;margin-top: 20px;">
              <img src="@/assets/grade7up/1.1-7.png" style="width: 120px;" v-viewer />
              <div style="text-align: center;">
                (第八题)
              </div>
            </div>
          </div>
        </li>
      </ol>
      <div style="text-align:right;color:#888;font-size:0.95rem;margin-top:8px;"></div>
    </BorderCard>
    <ReadingCard title="阅读与思考">
      <div>
        <h3 style="text-align:center;color:#7c3aed;font-size:1.18rem;margin-bottom:12px;">用正负数表示允许偏差</h3>
        <div style="margin-bottom: 12px;">
          在现代工业生产中，产品的尺寸、质量等都有标准规格。但是，一般在实际加工中，每个产品不可能都做得与标准规格完全一样。通常在某个范围内，只要不影响使用，产品比标准规格稍大或稍小一点，稍轻或稍重一点，都属于合格品，而超出这个范围的产品就不是合格品。
        </div>
        <div style="display:flex;align-items:flex-start;gap:32px;margin-top:18px;">
          <div>
            <p>
              生活中我们经常看到用正负数表示允许偏差的情形。例如，某品牌乒乓球的产品参数中标明球的直径是40 mm±0.05 mm，这表示乒乓球的标准直径是40 mm，偏差是±0.05
              mm，也就是说实际直径最大可以是40+0.05=40.05 mm，最小可以是40-0.05=39.95 mm，直径在这个范围内的乒乓球都是合格的。

            </p>
            <p>
              类似地，你能说出图中2.74±0.02 g的含义吗？你还能举出用正负数表示允许偏差的例子吗？

            </p>
          </div>
          <div style="flex-shrink:0;text-align:center;">
            <img src="@/assets/grade7up/1.1-6.png" style="width:150px;margin-bottom:8px;" v-viewer />
            <div style="font-size:0.98rem;color:#888;">图一</div>
          </div>
        </div>
        <div style="text-align:right;color:#888;font-size:0.95rem;margin-top:8px;">图1</div>
      </div>
    </ReadingCard>


  </div>
</template>

<script setup>
import { ref, watchEffect, nextTick } from 'vue'
import MathJax from '@/components/MathJax.vue'
import { Edit } from '@element-plus/icons-vue'
import ExampleCard from '@/components/ExampleCard.vue'
import ExerciseCard from '@/components/ExerciseCard.vue'
import ThinkingCard from '@/components/ThinkingCard.vue'
import ReadingCard from '@/components/ReadingCard.vue'
import BorderCard from '@/components/BorderCard.vue'

const showAnswer1 = ref(false)
const answerActive1 = ref([])

// 用户输入
const userAns1 = ref({ pos: '', neg: '' })
const userAns2 = ref('')
const userAns3 = ref('')
const userAns4 = ref('')

// 检查结果
const result1 = ref(null)
const result2 = ref(null)
const result3 = ref(null)
const result4 = ref(null)

const stdPos = ['4/3', '2.5', '1/4', '120']
const stdNeg = ['-1', '-3.14', '-2/7']

function checkAns1() {
  // 只要包含所有标准答案即可
  const pos = userAns1.value.pos.replace(/，/g, ',').split(',').map(function(s){ return s.trim().replace('+', '') }).filter(Boolean)
  const neg = userAns1.value.neg.replace(/，/g, ',').split(',').map(function(s){ return s.trim() }).filter(Boolean)
  const posOk = stdPos.every(function(item){ return pos.includes(item) }) && pos.length === stdPos.length
  const negOk = stdNeg.every(function(item){ return neg.includes(item) }) && neg.length === stdNeg.length
  result1.value = posOk && negOk
}
function checkAns2() {
  result2.value = userAns2.value.trim() === '-60'
}
function checkAns3() {
  result3.value = userAns3.value.trim() === '-150'
}
function checkAns4() {
  result4.value = userAns4.value.trim() === '-2'
}

// 新增练习6相关响应式数据和方法
const ex6ans1_1 = ref('')
const ex6ans1_2 = ref('')
const ex6ans2_1 = ref('')
const ex6ans2_2 = ref('')
const ex6ans2_3 = ref('')
const ex6ans3_1 = ref('')
const ex6ans3_2 = ref('')
const ex6result1 = ref(null)
const ex6result2 = ref(null)
const ex6result3 = ref(null)
const showEx6Answer = ref(false)
const ex6AnswerActive = ref([])
function checkEx6_1() {
  ex6result1.value = (ex6ans1_1.value.trim() === '-3' || ex6ans1_1.value.trim() === '−3') && (ex6ans1_2.value.trim() === '0')
}
function checkEx6_2() {
  ex6result2.value =
    (ex6ans2_1.value.includes('少') || ex6ans2_1.value.includes('低')) &&
    (ex6ans2_2.value.includes('相等') || ex6ans2_2.value.includes('一样') || ex6ans2_2.value === '0') &&
    (ex6ans2_3.value.includes('多') || ex6ans2_3.value.includes('高'))
}
function checkEx6_3() {
  ex6result3.value = (ex6ans3_1.value.replace('+', '').replace('％', '%').trim() === '10%') && (ex6ans3_2.value.replace('-', '').replace('％', '%').trim() === '5%')
}

watchEffect(function() {
  answerActive1.value = showAnswer1.value ? ['1'] : []
  // 让MathJax重新渲染答案区
  if (showAnswer1.value && window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise()
  }
})
// 新增：让练习2的答案展开/收起联动
watchEffect(function() {
  ex6AnswerActive.value = showEx6Answer.value ? ['1'] : []
})
</script>

<style scoped>
.section-content {
  background: #fff;
  padding: 40px 32px 32px 32px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  max-width: 850px;
  margin: 40px auto;
  font-size: 1.08rem;
  line-height: 1.9;
}

.image1.1-1 {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px #e3f2fd;
  background: #f5faff;
}

.section-title {
  color: #0984e3;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px #e3f2fd;
}

.intro {
  font-size: 1.15rem;
  font-weight: 500;
  color: #444;
  margin-bottom: 1.2rem;
}

.img-group {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin: 18px 0 8px 0;
}

.img-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px;
}

.blue-card {
  margin: 2rem 0 1.5rem 0;
  background: #f5faff;
  border: 1px solid #e3f2fd;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(9, 132, 227, 0.04);
  padding: 18px 24px 12px 24px;
}

.example-card {
  margin: 2rem 0 1.5rem 0;
  background: #fafdff;
  border-radius: 12px;
  border: 1px solid #e3f2fd;
  box-shadow: 0 2px 8px rgba(9, 132, 227, 0.04);
  padding: 18px 24px 12px 24px;
}

.card-title {
  color: #0984e3;
  font-weight: bold;
  margin-bottom: 0.7rem;
  font-size: 1.18rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.inline-img {
  max-width: 120px;
  margin: 0 12px 12px 0;
  border-radius: 8px;
  vertical-align: middle;
  box-shadow: 0 2px 8px #e3f2fd;
  background: #f5faff;
}

.img-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 18px 0 8px 0;
}

.img-caption {
  text-align: center;
  color: #888;
  font-size: 0.98rem;
  margin-bottom: 1.2rem;
}

.exercise-card {
  margin: 2rem 0 1.5rem 0;
  background: #fafdff;
  border-radius: 12px;
  border: 1px solid #e3f2fd;
  box-shadow: 0 2px 8px rgba(9, 132, 227, 0.04);
  padding: 18px 24px 12px 24px;
}

.exercise-list {
  margin-left: 1.2rem;
  margin-bottom: 1.2rem;
  font-size: 1.08rem;
}

.ex-num {
  font-weight: bold;
  color: #0984e3;
  margin-right: 4px;
  font-size: 1.1rem;
}

.ex-math {
  display: inline-block;
  min-width: 30px;
  text-align: center;
  vertical-align: middle;
}

.input-group {
  margin: 8px 0 0 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.ex-input {
  border-radius: 6px;
  font-size: 1rem;
  margin: 0 4px;
  background: #fafdff;
  border: 1.5px solid #e3f2fd;
  transition: border 0.2s;
}

.ex-input:focus {
  border: 1.5px solid #0984e3;
}

.ex-input.short {
  width: 80px !important;
}

.ex-btn {
  background: #0984e3;
  color: #fff;
  border-radius: 6px;
  font-size: 0.98rem;
  border: none;
  margin-left: 4px;
  transition: background 0.2s;
}

.ex-btn:hover {
  background: #3498db;
}

.answer-btn {
  margin-top: 10px;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  font-size: 0.98rem;
}

.answer-collapse {
  background: #fafdff;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.answer-content {
  background: #fafdff;
  border-radius: 8px;
  padding: 10px 16px;
  color: #0984e3;
  font-size: 1.05rem;
  line-height: 1.8;
}

.blank {
  display: inline-block;
  border-bottom: 1.5px solid #bbb;
  width: 60px;
  height: 1.2em;
  vertical-align: middle;
  margin: 0 4px;
}

.correct {
  color: #2ecc40;
  font-weight: bold;
  margin-left: 8px;
}

.wrong {
  color: #e74c3c;
  font-weight: bold;
  margin-left: 8px;
}

.exercise-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #0984e3;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1.2rem;
}

.exercise-group {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 1.2rem;
}

.exercise-item {
  display: flex;
  align-items: flex-start;
  background: #fafdff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #e3f2fd;
  padding: 18px 18px 12px 0;
  gap: 18px;
  border: 1.5px solid #e3f2fd;
  transition: box-shadow 0.2s, border 0.2s;
}

.exercise-item:hover {
  box-shadow: 0 4px 16px #e3f2fd;
  border: 1.5px solid #0984e3;
}

.ex-num-circle {
  width: 32px;
  height: 32px;
  background: #0984e3;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.15rem;
  margin-top: 2px;
  box-shadow: 0 2px 8px #e3f2fd;
}

.ex-body {
  flex: 1;
}

.ex-q {
  font-size: 1.08rem;
  margin-bottom: 6px;
  color: #333;
}

.ex-math-list {
  margin-bottom: 8px;
  font-size: 1.08rem;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.ex-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.ex-input {
  border-radius: 6px;
  font-size: 1rem;
  margin: 0 4px;
  background: #fafdff;
  border: 1.5px solid #e3f2fd;
  transition: border 0.2s;
}

.ex-input:focus {
  border: 1.5px solid #0984e3;
}

.ex-input.short {
  width: 80px !important;
}

.ex-btn {
  background: #0984e3;
  color: #fff;
  border-radius: 6px;
  font-size: 0.98rem;
  border: none;
  margin-left: 4px;
  transition: background 0.2s;
  box-shadow: 0 2px 8px #e3f2fd;
}

.ex-btn:hover {
  background: #3498db;
}

.ex-correct {
  background: #eafbe7;
  color: #27ae60;
  border-radius: 8px;
  padding: 2px 10px;
  margin-left: 10px;
  font-weight: bold;
  font-size: 1.02rem;
  box-shadow: 0 2px 8px #e3f2fd;
}

.ex-wrong {
  background: #fff0f0;
  color: #e74c3c;
  border-radius: 8px;
  padding: 2px 10px;
  margin-left: 10px;
  font-weight: bold;
  font-size: 1.02rem;
  box-shadow: 0 2px 8px #e3f2fd;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.note-style {
  background: #fdfbe9;
  border-radius: 16px;
  box-shadow: 0 2px 8px #e3e3c7;
  padding: 54px 24px 32px 24px;
  font-size: 1.18rem;
  font-family: 'KaiTi', '楷体', serif;
  color: #444;
  position: relative;
  margin-left: 60px;
  margin-top: 10px;
  margin-bottom: 10px;
  /* min-width: 260px; */
  max-width: 320px;
  line-height: 2.1;
  height: 110px;
}

.note-style::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 32px;
  background: radial-gradient(circle at 60% 40%, #f7e7b7 70%, #e3c98a 100%);
  border-radius: 50%;
  box-shadow: 0 2px 6px #e3c98a;
  z-index: 2;
}

.note-style::after {
  content: '';
  position: absolute;
  right: 18px;
  bottom: 0;
  width: 60px;
  height: 24px;
  background: linear-gradient(135deg, #fdfbe9 60%, #f7e7b7 100%);
  border-bottom-right-radius: 12px 24px;
  transform: skewY(8deg) rotate(4deg);
  z-index: 1;
}

.exercise-border-card {
  margin-top: 40px;
  padding: 24px;
  background: #fafdff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  max-width: 850px;
  margin: 40px auto;
  font-size: 1.08rem;
  line-height: 1.9;
}

.explore-border-card {
  margin-top: 40px;
  padding: 24px;
  background: #fafdff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  max-width: 850px;
  margin: 40px auto;
  font-size: 1.08rem;
  line-height: 1.9;
}
</style>