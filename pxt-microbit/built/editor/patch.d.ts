/**
 *       <block type="device_show_leds">
    <field name="LED00">FALSE</field>
    <field name="LED10">FALSE</field>
    <field name="LED20">FALSE</field>
    <field name="LED30">FALSE</field>
    <field name="LED40">FALSE</field>
    <field name="LED01">FALSE</field>
    <field name="LED11">FALSE</field>
    <field name="LED21">FALSE</field>
    <field name="LED31">TRUE</field>
    <field name="LED41">FALSE</field>
    <field name="LED02">FALSE</field>
    <field name="LED12">FALSE</field>
    <field name="LED22">FALSE</field>
    <field name="LED32">FALSE</field>
    <field name="LED42">FALSE</field>
    <field name="LED03">FALSE</field>
    <field name="LED13">TRUE</field>
    <field name="LED23">FALSE</field>
    <field name="LED33">FALSE</field>
    <field name="LED43">FALSE</field>
    <field name="LED04">FALSE</field>
    <field name="LED14">FALSE</field>
    <field name="LED24">FALSE</field>
    <field name="LED34">FALSE</field>
    <field name="LED44">FALSE</field>
  </block>
 
  to
<block type="device_show_leds">
    <field name="LEDS">`
    # # # # #
    . . . . #
    . . . . .
    . . . . #
    . . . . #
    `
    </field>
  </block>
 */
export declare function patchBlocks(pkgTargetVersion: string, dom: Element): void;
