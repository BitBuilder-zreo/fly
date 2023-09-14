package org.fly.common.date;

import java.util.*;
import java.text.SimpleDateFormat;

public class DateUtils {
    /**
     * 获取当前时间减去指定分钟数后的日期时间。
     *
     * @param min 要减去的分钟数
     * @return 减去指定分钟数后的日期时间
     */
    public static Date subMin(int min) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, -min);
        return cal.getTime();
    }

    /**
     * 获取当前时间加上指定分钟数后的日期时间。
     *
     * @param min 要加上的分钟数
     * @return 加上指定分钟数后的日期时间
     */
    public static Date addMin(int min) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, min);
        return cal.getTime();
    }

    /**
     * 获取当前日期减去指定天数后的日期。
     *
     * @param day 要减去的天数
     * @return 减去指定天数后的日期
     */
    public static Date subDay(int day) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.DAY_OF_MONTH, -day);
        return cal.getTime();
    }

    /**
     * 获取当前日期加上指定天数后的日期。
     *
     * @param day 要加上的天数
     * @return 加上指定天数后的日期
     */
    public static Date addDay(int day) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.DAY_OF_MONTH, day);
        return cal.getTime();
    }

    /**
     * 获取当前日期的零点时间（凌晨）。
     *
     * @return 当前日期的零点时间
     */
    public static Date getCurrentZero() {
        Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        return c.getTime();
    }

    /**
     * 获取当前日期往前推指定天数的零点时间（凌晨）。
     *
     * @param day 天数
     * @return 当前日期往前推指定天数的零点时间
     */
    public static Date getCurrentZero(int day) {
        Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        c.add(Calendar.DAY_OF_MONTH, -day);
        return c.getTime();
    }

    /**
     * 获取指定日期的凌晨时间到下个凌晨时间的范围。
     *
     * @param day 天数
     * @return 包含指定日期的凌晨时间和下个凌晨时间的数组
     */
    public static Date[] getBeginEnd(int day) {
        return new Date[]{getCurrentZero(day), getCurrentZero(day - 1)};
    }

    /**
     * 将日期格式化为指定的字符串格式。
     *
     * @param date   要格式化的日期
     * @param format 格式化字符串
     * @return 格式化后的日期字符串
     */
    public static String format(Date date, String format) {
        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        return dateFormat.format(date);
    }

    /**
     * 将日期格式化为默认的字符串格式 "yyyy-MM-dd HH:mm:ss"。
     *
     * @param date 要格式化的日期
     * @return 格式化后的日期字符串
     */
    public static String format(Date date) {
        return format(date, "yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 获取日期的时间戳（毫秒）。
     *
     * @param date 要获取时间戳的日期
     * @return 时间戳（毫秒）
     */
    public static Long timestamp(Date date) {
        return date.getTime();
    }

    public static void main(String[] args) {
        // 输出指定日期范围的凌晨时间和下个凌晨时间
        System.out.println(getBeginEnd(1)[0]);
        System.out.println(getBeginEnd(1)[1]);
        // 输出一个随机整数（0-9之间）
        System.out.println(new Random().nextInt(10));
    }
}
